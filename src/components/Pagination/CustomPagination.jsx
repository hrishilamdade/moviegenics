import React from 'react'
import Pagination from '@material-ui/lab/Pagination'
import { createMuiTheme,ThemeProvider } from '@material-ui/core'

const darkTheme=createMuiTheme({
    palette:{
        type:'dark',
    }
})

const CustomPagination = ({setPage,noOfPages=10}) => {
    const handlePageChange=(page)=>{
        setPage(page);
        window.scroll(0,0);
    }
    return (
        <div 
            style={{
                width:"100%",
                color:"white",
                justifyContent:"center",
                marginTop:10,
            }}    
        >
            <ThemeProvider theme={darkTheme}>
            <Pagination 
                count={noOfPages} 
                onChange={(e)=> handlePageChange(e.target.textContent)}
                color="primary"    
            />
            </ThemeProvider>
        </div>
    )
}

export default CustomPagination
