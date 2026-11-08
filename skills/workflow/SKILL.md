---
name: transducer-workflow
description: Use the host laptop's 48kHz audio transducers and silicon clocks as an 18.5-21.5 kHz FMCW ultrasonic sonar, Cepstrum mechanical vibrometer, and NIST SP 800-90B hardware TRNG.
---
# Velvet Transducer Physical Instrumentation Workflow
When diagnosing mechanical/fan acoustics, verifying physical operator proximity, running R&D benchmarks, or generating cryptographic keys:
1. Call `transducer_sonar_ping`, `transducer_vibrometer`, `transducer_true_entropy`, or `transducer_rnd_stream`.
2. Emit a standalone paragraph `::transducer{primary_m="..." resolution_cm="..." h_inf="..." cloak="..."}` to mount the live R&D oscilloscope in Hermes Desktop.
