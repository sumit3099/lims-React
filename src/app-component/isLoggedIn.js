export var requireAuth = (path) => {

      if(localStorage.getItem('limsuser')!==null)
        { 
                 window.login="yes"
                window.location = path  
        }
        else
        {
             window.login="no"
            window.location = "http://localhost:3000/#/login"
        }
}