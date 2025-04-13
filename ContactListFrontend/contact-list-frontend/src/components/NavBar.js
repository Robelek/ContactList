function NavBar(props)
{
    let userData = props.userData;
    let handleLogout = props.handleLogout;
    return (
        <nav>
                {userData === null? (
                    <>
                        <a href="/login">
                            <div className='buttonLink'> LOGIN </div>
                        </a>
 
                        <a href="/register">
                            <div className='buttonLink'> REGISTER </div>
                        </a>
                    </>
                    )
                    :
                    (
                    <>
                        <div>
                            <span>
                            Logged in as {userData.email}
                            </span>
                            
                        </div>
                        <div>
                            <a href="/">
                                <div className='buttonLink' onClick={handleLogout}> logout </div>
                            </a>
                        </div>
                    </>
                    
                    )
                }
               
            </nav>
    )
}

export default NavBar;