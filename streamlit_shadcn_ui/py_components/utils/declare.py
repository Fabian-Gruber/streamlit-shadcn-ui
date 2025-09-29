# streamlit_shadcn_ui/py_components/utils/declare.py
import os
from importlib.resources import files as _files

import streamlit.components.v1 as components

DEV = os.getenv("STREAMLIT_SHADCN_UI_DEV", "false").lower() in ("true", "1", "yes")
DEV_URL = os.getenv("STREAMLIT_SHADCN_UI_DEV_URL", "http://localhost:5173")


def declare_component(component_name: str):
    if DEV:
        return components.declare_component(component_name, url=DEV_URL)
    dist = _files("streamlit_shadcn_ui").joinpath("frontend_dist")
    return components.declare_component(component_name, path=str(dist))
