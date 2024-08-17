import React from "react";
import {
  Drawer,
  List,
  Link,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  Box,
  useTheme,
} from "@mui/material";
import NextLink from "next/link";
import HomeIcon from "@mui/icons-material/Home";
import StyleIcon from "@mui/icons-material/Style";
import QuizIcon from "@mui/icons-material/Quiz";
import SmartToyIcon from "@mui/icons-material/SmartToy";

interface NavItem {
  text: string;
  icon: React.ReactElement;
  path: string;
}

const navItems: NavItem[] = [
  { text: "Home", icon: <HomeIcon />, path: "/" },
  { text: "Flashcard Sets", icon: <StyleIcon />, path: "/flashcard-sets" },
  { text: "Quizzes", icon: <QuizIcon />, path: "/quizzes" },
  { text: "Generate", icon: <SmartToyIcon />, path: "/generate" },
];

interface SideNavBarProps {}

const SideNavBar: React.FC<SideNavBarProps> = ({}) => {
  const theme = useTheme();

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 240,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: 240,
          boxSizing: "border-box",
          backgroundColor: theme.palette.primaryContainer.main,
        },
      }}
    >
      <Box sx={{ overflow: "auto" }}>
        <List>
          {navItems.map(({ text, icon, path }) => (
            <Link
              href={path}
              key={text}
              color={theme.palette.tertiary.main}
              component={NextLink}
              passHref
            >
              <ListItemButton>
                <ListItemIcon>{icon}</ListItemIcon>
                <ListItemText
                  color={theme.palette.tertiary.contrastText}
                  primary={text}
                />
              </ListItemButton>
            </Link>
          ))}
        </List>
      </Box>
    </Drawer>
  );
};

export default SideNavBar;
