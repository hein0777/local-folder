export default function NavBar()
{
    return(
        <div>
            <nav className="nav bg-dark" style={{ height:"75px ",alignItems:"center",fontSize:"20px",fontWeight:"20rem"}}>
                <a className="nav-link active" style={{color:"white"}} href="/">Home</a>
                <a className="nav-link" style={{color:"white"}} href="/dashboard">Dashboard</a>
                <a className="nav-link" style={{color:"white"}} href="/weather">Weather</a>
                <a className="nav-link" style={{color:"white"}} href="/blog">Blog</a>

            </nav>
        </div>
    )
}