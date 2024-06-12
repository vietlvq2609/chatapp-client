import React from "react";
import { SvgIconProps } from "@mui/material/SvgIcon";
import ChatIcon from "@mui/icons-material/Chat";
import SettingsIcon from "@mui/icons-material/Settings";
import NotificationsIcon from "@mui/icons-material/Notifications";
import LockIcon from "@mui/icons-material/Lock";
import TranslateIcon from "@mui/icons-material/Translate";

interface MenuItem {
  icon: React.ComponentType<SvgIconProps>;
  message: string;
  href: string;
}

const MAIN_MENU: MenuItem[] = [
  {
    icon: ChatIcon,
    message: "All chats",
    href: "/chat",
  },
  {
    icon: SettingsIcon,
    message: "General Settings",
    href: "/settings",
  },
  {
    icon: NotificationsIcon,
    message: "Notifications",
    href: "/notifcations",
  },
  // {
  //    icon: LockIcon,
  //    message: 'Privacy and Security',
  //    href: '/privacy'
  // },
  // {
  //    icon: TranslateIcon,
  //    message: 'Language',
  //    href: '/languges'
  // }
];

export { MAIN_MENU };
