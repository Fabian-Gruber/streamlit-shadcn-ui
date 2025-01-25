### Basic Usage

```py
import streamlit as st
import streamlit_shadcn_ui as ui

# Radio Group Component
radio_options = [
    {"label": "Option A", "value": "A", "id": "r1"},
    {"label": "Option B", "value": "B", "id": "r2"},
    {"label": "Option C", "value": "C", "id": "r3"}
]
radio_value = ui.radio_group(options=radio_options, default_value="B", mode="single",key="radio1")
st.write("Selected Radio Option:", radio_value)

radio_value_1 = ui.radio_group(options=radio_options, default_value=["B"], mode="multiple",key="radio2")
st.write("Selected Radio Option:", radio_value_1)

st.write(ui.radio_group)
```