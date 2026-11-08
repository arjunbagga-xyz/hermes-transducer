"""transducer: Active Ultrasonic Sonar, Mechanical Vibrometer, R&D Stream & Physical TRNG."""

from __future__ import annotations

from .engine import (
    TRANSDUCER_ENTROPY_SCHEMA,
    TRANSDUCER_RND_STREAM_SCHEMA,
    TRANSDUCER_SONAR_SCHEMA,
    TRANSDUCER_VIBROMETER_SCHEMA,
    handle_transducer_rnd_stream,
    handle_transducer_sonar_ping,
    handle_transducer_true_entropy,
    handle_transducer_vibrometer,
)


def on_session_start_hook(payload: dict, **kwargs) -> dict:
    return {"status": "transducer-ready", "sample_rate_hz": 48000}


def register(ctx) -> None:
    ctx.register_tool(
        name="transducer_sonar_ping",
        toolset="transducer",
        schema=TRANSDUCER_SONAR_SCHEMA,
        handler=handle_transducer_sonar_ping,
        is_async=False,
        emoji="🦇",
    )
    ctx.register_tool(
        name="transducer_vibrometer",
        toolset="transducer",
        schema=TRANSDUCER_VIBROMETER_SCHEMA,
        handler=handle_transducer_vibrometer,
        is_async=False,
        emoji="🎛️",
    )
    ctx.register_tool(
        name="transducer_true_entropy",
        toolset="transducer",
        schema=TRANSDUCER_ENTROPY_SCHEMA,
        handler=handle_transducer_true_entropy,
        is_async=False,
        emoji="🎲",
    )
    ctx.register_tool(
        name="transducer_rnd_stream",
        toolset="transducer",
        schema=TRANSDUCER_RND_STREAM_SCHEMA,
        handler=handle_transducer_rnd_stream,
        is_async=False,
        emoji="📡",
    )

    ctx.register_hook("on_session_start", on_session_start_hook)

    from pathlib import Path
    skills_dir = Path(__file__).parent / "skills"
    if hasattr(ctx, "register_skill") and skills_dir.exists():
        for child in sorted(skills_dir.iterdir()):
            skill_md = child / "SKILL.md"
            if child.is_dir() and skill_md.exists():
                ctx.register_skill(child.name, skill_md)
