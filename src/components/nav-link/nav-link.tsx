import { Link, LinkProps, useLocation } from "react-router-dom";

export function NavLink(props: LinkProps) {
    const { pathname } = useLocation()

    return (
        <Link 
            className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground data-[current=true]:text-foreground"
            {...props} 
            data-current={pathname === props.to}
        />
    )
}