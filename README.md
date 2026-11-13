# transducer

**The Laptop as a Physical Physics Laboratory: Active 18.5–21.5 kHz Ultrasonic Sonar, Mechanical Cepstrum Vibrometer, and OS CSPRNG Entropy Generator.**

**Prerequisites:** Requires the system PortAudio library (`libportaudio2` on Debian/Ubuntu, `brew install portaudio` on macOS, or pre-bundled in Windows wheels).

Every laptop running Hermes Agent has a 48 kHz DAC/ADC audio codec, high-resolution silicon oscillator clocks, and solid-state sensors—yet agents treat the host machine as an abstract text terminal. `transducer` turns the machine's transducers into three first-principles instruments:

1. **Inaudible Ultrasonic LFM Sonar (`transducer_sonar_ping`)**: Synthesizes an 18.5–21.5 kHz linear frequency-modulated (LFM) chirp $s(t) = w(t)\cos(2\pi(f_0 t + \frac{B}{2T}t^2))$ and performs matched-filter pulse compression $R_{ys}(\tau) = |\mathcal{H}((y * s_{\text{rev}})(\tau))|$ to measure physical reflector distances $d = \frac{c(T_C)\tau}{2}$ with centimeter range resolution $\Delta R = \frac{c}{2B} \approx 5.7\text{ cm}$.
2. **Mechanical FFT & Power Cepstrum Vibrometer (`transducer_vibrometer`)**: Computes Welch PSD and the power cepstrum $C_p(q) = |\mathcal{F}^{-1}\{\log |\mathcal{F}\{x(t)\}|^2\}|^2$ to diagnose cooling fan RPM, blade-pass harmonics, and bearing wear.
3. **OS CSPRNG Entropy Generator (`transducer_true_entropy`)**: Generates cryptographic random bytes using the host operating system's CSPRNG (`os.urandom`) with Von Neumann debiasing and SHA3-256 whitening.
