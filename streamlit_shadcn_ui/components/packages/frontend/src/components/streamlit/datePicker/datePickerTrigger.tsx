import { format, parse } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn, getPositionRelativeToTopDocument } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { forwardRef, useEffect, useState } from "react";
import { Streamlit } from "streamlit-component-lib";
import { useBodyStyle } from "@/hooks/useBodyStyle";
import { Label } from "@/components/ui/label";

interface StDatePickerTriggerProps {
    value?: string | string[];
    open: boolean;
    label?: string;
}

export const StDatePickerTrigger = forwardRef<
    HTMLDivElement,
    StDatePickerTriggerProps
>((props, ref) => {
    const { label, value } = props;
    const [open, setOpen] = useState(Boolean(props.open));

    const date: Date[] = value
        ? value instanceof Array
            ? value.map((v) => parse(v, 'yyyy-MM-dd', new Date()))
            : [parse(value, 'yyyy-MM-dd', new Date())]
        : null;

    useEffect(() => {
        setOpen(Boolean(props.open));
    }, [props.open]);

    useEffect(() => {
        if (ref && typeof ref !== "function") {
            const pos = getPositionRelativeToTopDocument(ref.current);

            Streamlit.setComponentValue({
                x: pos.left,
                // consider the margin of the container
                y:
                    pos.top +
                    ref.current.offsetHeight +
                    Number(ref.current.style.marginTop.replace("px", "")),
                open,
            });
        }
    }, [open]);
    useBodyStyle("body { padding-right: 0.5em !important; }");

    return (
        <div className="m-1" ref={ref}>
            {label && <Label className="mb-2 block">{label}</Label>}
            <Button
                variant={"outline"}
                className={cn(
                    "w-[280px] justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                )}
                onClick={() => {
                    setOpen((v) => !v);
                }}
            >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? (
                    date.map((d) => format(d, "yyyy-MM-dd")).join(" - ")
                ) : (
                    <span>Pick a date</span>
                )}
            </Button>
        </div>
    );
});