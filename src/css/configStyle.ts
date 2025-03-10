import { CSSProperties } from "react";

export const configStyleContainer = {
  theme: {
    token: {
      controlHeight: 40,
      fontFamily: "lexend",
      borderRadius: 16,
    },
    components: {
      Button: {
        colorPrimary: "var(--blue2)",
        colorPrimaryActive: "var(--blue2)",
        colorPrimaryHover: "var(--blue2)",
        colorBorder: "var(--blue2)",
        defaultBorderColor: "var(--blue2)",
        defaultColor: "var(--blue2)",
        borderColorDisabled: "#d9d9d9",
      },
      Radio: {
        buttonSolidCheckedActiveBg: "var(--blue2)",
        buttonSolidCheckedBg: "var(--blue2)",
        buttonSolidCheckedHoverBg: "var(--blue2)",
        colorPrimary: "var(--blue2)",
      },
      DatePicker: {
        colorPrimary: "var(--blue2)",
      },
    },
  },
};

export const styleToast: CSSProperties = {
  borderRadius: "10px",
  padding: "10px",
  textAlign: "center",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};
