"use client";

import { useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { ProfileSettings } from "./components/ProfileSettings";
import { PostsHistory } from "./components/PostsHistory";
import SettingsIcon from "@mui/icons-material/Settings";
import HistoryIcon from "@mui/icons-material/History";
import { useTranslation } from "react-i18next";

const TABS = [
  {
    value: "settings",
    icon: <SettingsIcon />,
  },
  {
    value: "history",
    icon: <HistoryIcon />,
  },
];

const TAB_VALUES = TABS.map((tab) => tab.value);

export default function Profile() {
  const { t } = useTranslation();
  const [activeTab, setAtciveTab] = useState(TAB_VALUES[0]);

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setAtciveTab(newValue);
  };

  const displayActiveTab = () =>
    activeTab === "settings" ? <ProfileSettings /> : <PostsHistory />;

  return (
    <>
      <Tabs
        value={activeTab}
        onChange={handleTabChange}
        sx={{
          "& .MuiTabs-flexContainer": {
            width: "fit-content",
          },

          "& .MuiTab-root": {
            flexDirection: "row",
            gap: 1,
          },

          "& .MuiTabs-scroller": {
            display: "flex",
            justifyContent: "center",
          },

          "& .MuiSvgIcon-root": {
            margin: 0,
          },

          "& .Mui-selected": {},
        }}
      >
        {TABS.map(({ value, icon }) => (
          <Tab
            key={value}
            label={(value === "settings" ? t("profile.settings") : t("profile.history")).toUpperCase()}
            value={value}
            icon={icon}
          />
        ))}
      </Tabs>

      {displayActiveTab()}
    </>
  );
}
