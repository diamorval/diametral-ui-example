import {
  BellIcon,
  CaretUpDownIcon,
  MagnifyingGlassIcon,
  SignOutIcon,
  UserIcon,
} from "@phosphor-icons/react"
import {
  Avatar,
  AvatarFallback,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  Button,
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Kbd,
  KbdGroup,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Separator,
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
  Skeleton,
  ThemeSwitcher,
  type ThemeSwitcherMode,
  Toaster,
  TooltipProvider,
  Wordmark,
} from "diametral-ds"
import { Suspense, useEffect, useState } from "react"

import { PAGES, type PageId } from "./pages"

const GROUPS = [...new Set(PAGES.map((p) => p.group))]

function useHashPage(): PageId {
  const read = () => (PAGES.find((p) => `#/${p.id}` === location.hash)?.id ?? "overview") as PageId
  const [page, setPage] = useState(read)
  useEffect(() => {
    const onHash = () => {
      setPage(read())
      window.scrollTo(0, 0)
    }
    window.addEventListener("hashchange", onHash)
    return () => window.removeEventListener("hashchange", onHash)
  }, [])
  return page
}

function useTheme() {
  const [mode, setMode] = useState<ThemeSwitcherMode>(
    () => (localStorage.getItem("theme") as ThemeSwitcherMode | null) ?? "system"
  )
  useEffect(() => {
    localStorage.setItem("theme", mode)
    const media = matchMedia("(prefers-color-scheme: dark)")
    const apply = () =>
      document.documentElement.classList.toggle("dark", mode === "dark" || (mode === "system" && media.matches))
    apply()
    media.addEventListener("change", apply)
    return () => media.removeEventListener("change", apply)
  }, [mode])
  return [mode, setMode] as const
}

export function App() {
  const page = useHashPage()
  const [mode, setMode] = useTheme()
  const [paletteOpen, setPaletteOpen] = useState(false)
  const current = PAGES.find((p) => p.id === page)!

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "k" && (event.metaKey || event.ctrlKey)) {
        event.preventDefault()
        setPaletteOpen((open) => !open)
      }
    }
    document.addEventListener("keydown", onKeyDown)
    return () => document.removeEventListener("keydown", onKeyDown)
  }, [])

  return (
    <TooltipProvider>
      <Toaster>
        <SidebarProvider>
          <Sidebar collapsible="icon">
            <SidebarHeader>
              <a href="#/overview" className="flex items-center gap-2 px-2 py-1.5">
                <Wordmark variant="square" label="" className="[&_svg]:size-6" />
                <span className="text-sm font-medium group-data-[collapsible=icon]:hidden">Diametral Ops</span>
              </a>
            </SidebarHeader>
            <SidebarContent>
              {GROUPS.map((group) => (
                <SidebarGroup key={group}>
                  <SidebarGroupLabel>{group}</SidebarGroupLabel>
                  <SidebarGroupContent>
                    <SidebarMenu>
                      {PAGES.filter((p) => p.group === group).map((p) => (
                        <SidebarMenuItem key={p.id}>
                          <SidebarMenuButton
                            isActive={p.id === page}
                            tooltip={p.title}
                            render={<a href={`#/${p.id}`} />}
                          >
                            <p.icon /> <span>{p.title}</span>
                          </SidebarMenuButton>
                          {"badge" in p ? <SidebarMenuBadge>{p.badge}</SidebarMenuBadge> : null}
                        </SidebarMenuItem>
                      ))}
                    </SidebarMenu>
                  </SidebarGroupContent>
                </SidebarGroup>
              ))}
            </SidebarContent>
            <SidebarFooter>
              <SidebarMenu>
                <SidebarMenuItem>
                  <DropdownMenu>
                    <SidebarMenuButton size="lg" render={<DropdownMenuTrigger />}>
                      <Avatar className="size-7">
                        <AvatarFallback>CR</AvatarFallback>
                      </Avatar>
                      <span className="flex min-w-0 flex-col text-start">
                        <span className="truncate">Camille Roux</span>
                        <span className="truncate text-xs text-muted-foreground">camille@example.com</span>
                      </span>
                      <CaretUpDownIcon className="ms-auto text-muted-foreground" />
                    </SidebarMenuButton>
                    <DropdownMenuContent side="top" align="start">
                      <DropdownMenuItem onClick={() => (location.hash = "#/settings")}>
                        <UserIcon /> Account
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem variant="destructive">
                        <SignOutIcon /> Sign out
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarFooter>
            <SidebarRail />
          </Sidebar>

          <SidebarInset>
            <header className="sticky top-0 z-10 flex h-14 items-center gap-3 border-b border-border bg-background px-4">
              <SidebarTrigger />
              <Separator orientation="vertical" className="h-5" />
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink href="#/overview">{current.group}</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbPage>{current.title}</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
              <div className="ms-auto flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={() => setPaletteOpen(true)}>
                  <MagnifyingGlassIcon /> Search
                  <KbdGroup>
                    <Kbd>⌘</Kbd>
                    <Kbd>K</Kbd>
                  </KbdGroup>
                </Button>
                <Popover>
                  <PopoverTrigger render={<Button variant="ghost" size="icon" aria-label="Notifications" />}>
                    <BellIcon />
                  </PopoverTrigger>
                  <PopoverContent align="end" className="w-72 text-sm">
                    <p className="font-medium">Notifications</p>
                    <ul className="mt-2 flex flex-col gap-2 text-muted-foreground">
                      <li>Lumen SA signed the Q4 statement of work.</li>
                      <li>Two timesheets are waiting for approval.</li>
                      <li>Invoice INV-2041 is 12 days overdue.</li>
                    </ul>
                  </PopoverContent>
                </Popover>
                <ThemeSwitcher variant="dropdown" value={mode} onValueChange={setMode} />
              </div>
            </header>

            <main className="flex-1 p-4 md:p-6">
              <Suspense fallback={<Skeleton className="h-96 w-full" />}>
                <current.Component />
              </Suspense>
            </main>
          </SidebarInset>

          <CommandDialog open={paletteOpen} onOpenChange={setPaletteOpen}>
            <Command>
              <CommandInput placeholder="Jump to a page…" />
              <CommandList>
                <CommandEmpty>No page matches.</CommandEmpty>
                {GROUPS.map((group) => (
                  <CommandGroup key={group} heading={group}>
                    {PAGES.filter((p) => p.group === group).map((p) => (
                      <CommandItem
                        key={p.id}
                        onSelect={() => {
                          location.hash = `#/${p.id}`
                          setPaletteOpen(false)
                        }}
                      >
                        <p.icon /> {p.title}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                ))}
              </CommandList>
            </Command>
          </CommandDialog>
        </SidebarProvider>
      </Toaster>
    </TooltipProvider>
  )
}
