import {
  CalendarBlankIcon,
  ChartLineUpIcon,
  ChatsCircleIcon,
  GearIcon,
  HouseIcon,
  KanbanIcon,
  PlusCircleIcon,
  UsersIcon,
} from "@phosphor-icons/react"
import { lazy } from "react"

export const PAGES = [
  { id: "overview", title: "Overview", group: "Workspace", icon: HouseIcon, Component: lazy(() => import("./pages/overview")) },
  { id: "analytics", title: "Analytics", group: "Workspace", icon: ChartLineUpIcon, Component: lazy(() => import("./pages/analytics")) },
  { id: "clients", title: "Clients", group: "Workspace", icon: UsersIcon, badge: "248", Component: lazy(() => import("./pages/clients")) },
  { id: "projects", title: "Projects", group: "Delivery", icon: KanbanIcon, Component: lazy(() => import("./pages/projects")) },
  { id: "planning", title: "Planning", group: "Delivery", icon: CalendarBlankIcon, Component: lazy(() => import("./pages/planning")) },
  { id: "inbox", title: "Inbox", group: "Delivery", icon: ChatsCircleIcon, badge: "3", Component: lazy(() => import("./pages/inbox")) },
  { id: "new-mission", title: "New mission", group: "Delivery", icon: PlusCircleIcon, Component: lazy(() => import("./pages/new-mission")) },
  { id: "settings", title: "Settings", group: "Account", icon: GearIcon, Component: lazy(() => import("./pages/settings")) },
] as const

export type PageId = (typeof PAGES)[number]["id"]
