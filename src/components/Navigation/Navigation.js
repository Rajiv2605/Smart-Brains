import React from 'react';

const Navigation = ({onRouteChange, isSignedIn, checkSignin}) => {
    return(
        <div>
            {
                isSignedIn &&
                <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
                    <p onClick={()=>{onRouteChange('signin'); checkSignin(false)}} className='f3 link dim black underline pa3 pointer'>Sign out</p>
                </nav>
            }
        </div>
    )
}

export default Navigation;