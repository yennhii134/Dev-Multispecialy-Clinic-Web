import { theme } from "./theme";
import colors from "tailwindcss/colors";

export const configStyle = {
  theme: {
    components: {
      Button: {
        controlHeight: 40,
        colorPrimary: theme.colors["primary-blue"][50],
        colorPrimaryActive: theme.colors["primary-blue"][50],
        colorPrimaryHover: theme.colors["primary-blue"][50],
        colorBorder: theme.colors["primary-blue"][50],
        defaultBorderColor: theme.colors["primary-blue"][50],
      },
      Radio: {
        controlHeight: 40,
        buttonSolidCheckedActiveBg: theme.colors["primary-blue"][50],
        buttonSolidCheckedBg: theme.colors["primary-blue"][50],
        buttonSolidCheckedHoverBg: theme.colors["primary-blue"][50],
        colorPrimary: theme.colors["primary-blue"][50],
      },
    },
  },
};
