---
name: transducer-workflow
description: Use the host laptop's 48kHz audio transducers and silicon clocks as an 18.5-21.5 kHz FMCW ultrasonic sonar, Cepstrum mechanical vibrometer, and OS CSPRNG entropy generator.
---
# Velvet Transducer Physical Instrumentation Workflow
When diagnosing mechanical/fan acoustics, verifying physical operator proximity, or running R&D benchmarks:
1. Call `transducer_sonar_ping`, `transducer_vibrometer`, `transducer_true_entropy`, or `transducer_rnd_stream`.
2. Emit a standalone paragraph `::transducer{primary_m="..." resolution_cm="..." proximity="..."}` to mount the live R&D oscilloscope in Hermes Desktop.

## What it actually is (read before relying on it)
- **Real-audio only.** No simulation mode, no hardcoded fake values. `transducer_sonar_ping` emits a real 18.5-21.5 kHz LFM chirp through the speakers and captures the echo on the microphone. `transducer_vibrometer` records real microphone audio for Welch PSD + cepstrum analysis. No `simulate` parameter, no `simulated_Reflector_distances_m`, no `simulated_fan_rpm`, no `bearing_fault_index`.
- `proximity_detected` is `0.15 < distance <= 0.85` m. A user threshold of 1.5 m is NOT enforced by the flag — inspect `detected_reflectors[].distance_m` manually and compare against the requested threshold.
- Entropy bytes are harvested from the host OS CSPRNG (`os.urandom`, Windows: BCryptGenRandom; Linux: /dev/urandom) with SHA3-256 whitening. Private cryptographic keys should never pass through agent chat.
- `transducer_rnd_stream` reads sonar/vibrometer/TRNG with defensive `.get()` fallbacks so a no-audio or pyaudio-missing host returns degraded sub-frames instead of crashing. `host_loadavg_1m` defaults to `0.0` on hosts without `/proc/loadavg` (e.g. Windows).
- Doppler shift in `rnd_stream` is `0.0` unless a real moving reflector is detected — no assumed target motion.
- Real-audio mode requires `pyaudio>=0.2.11` (in `plugin.yaml`). On hosts without pyaudio or a working mic/speaker, tools return `status: "error"` with `mode: "real_audio"` — they do not fall back to simulation.
- `web/router.py` `/status` calls `handle_transducer_sonar_ping({})` with no simulate flag — returns `degraded` on no-audio hosts instead of fabricating results.

## Pitfalls (Hermes plugin execution)
- Handler return contract: Hermes rejects a handler that returns a raw `dict` with "unsupported result type: dict". Every handler MUST return a JSON string. Wrap with the plugin's `_ensure_json_str(...)` helper (already applied in `__init__.py`'s `register()`).
- Catalog validation (Rule 17): `__pycache__` / `.pyc` artifacts in the plugin tree fail validation. Remove them before `hermes plugins validate` / `doctor`.
- The plugin is loaded from its install path; if it lives under `Downloads/`, moving it breaks the import. Treat the path as part of the setup.
- The desktop app loads from `desktop-plugins/transducer/plugin.js`, not `plugins/transducer/desktop/plugin.js`. Keep both in sync.
- After any change to `__init__.py`, restart Hermes — the plugin is not hot-reloaded into an existing session.

## Verification
- No-audio host: sonar returns `status: "error"`, `mode: "real_audio"` with a descriptive error message — no crash, no fabricated data.
- Empty reflector list (no echoes detected): returns `primary_reflector_m: 0.0`, `[]`, cloak=false.
- After any change to `__init__.py`, restart Hermes — the plugin is not hot-reloaded into an existing session.
