# transducer

**The Laptop as a Physical Physics Laboratory: Active 18.5–21.5 kHz Ultrasonic Sonar, Mechanical Cepstrum Vibrometer, and Physical Shot-Noise TRNG.**

Every laptop running Hermes Agent has a 48 kHz DAC/ADC audio codec, high-resolution silicon oscillator clocks, and solid-state sensors—yet agents treat the host machine as an abstract text terminal. `transducer` turns the machine's transducers into three first-principles instruments:

1. **Inaudible Ultrasonic LFM Sonar (`transducer_sonar_ping`)**: Synthesizes an 18.5–21.5 kHz linear frequency-modulated (LFM) chirp $s(t) = w(t)\cos(2\pi(f_0 t + \frac{B}{2T}t^2))$ and performs matched-filter pulse compression $R_{ys}(\tau) = |\mathcal{H}((y * s_{\text{rev}})(\tau))|$ to measure physical reflector distances $d = \frac{c(T_C)\tau}{2}$ with centimeter range resolution $\Delta R = \frac{c}{2B} \approx 5.7\text{ cm}$.
2. **Mechanical FFT & Power Cepstrum Vibrometer (`transducer_vibrometer`)**: Computes Welch PSD and the power cepstrum $C_p(q) = |\mathcal{F}^{-1}\{\log |\mathcal{F}\{x(t)\}|^2\}|^2$ to diagnose cooling fan RPM, blade-pass harmonics, and bearing wear.
3. **Physical Timing-Jitter / Shot-Noise True RNG (`transducer_true_entropy`)**: Harvests physical nanosecond oscillator phase-noise + thermal floor LSBs, applies Von Neumann debiasing and SHA3-256 Toeplitz whitening, and computes NIST SP 800-90B min-entropy $H_\infty(X) = -\log_2(\max_x P(X=x))$.
