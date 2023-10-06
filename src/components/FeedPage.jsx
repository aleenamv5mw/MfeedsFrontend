import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import {
  AppBar,
  Toolbar,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Button,
  Box,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: '#ffffff',
    color: '#fffffff',
    height: '3000px',
    marginLeft: '30px' ,
    marginTop:'-20px'
    // adjust the value as needed
  },
  
  appbarRight: {
    marginLeft: 'auto',
    marginRight: '20px',
  },
  dropdown: {
    minWidth: 200,
    marginLeft: theme.spacing(2),
    marginTop: '50px',
  },
  
  searchForm: {
    display: 'flex',
    width: '350px',
    alignItems: 'center',
    height: '20px',
    marginLeft: theme.spacing(2),
    backgroundColor: '#transparent',
    marginTop: '50px',
    border: 'none',
    borderBottom: '1px solid #ccc',
  },
  searchInput: {
    width: '350px',
    flex: '1',
    border: 'none',
    outline: 'none',
    fontSize: '16px',
    backgroundColor: '#ffffff',
    borderRadius: '4px',
  },
  generateButton: {
    marginLeft: theme.spacing(2),
    backgroundColor: '#F37E12F2',
    color: '#fffffff',
    marginTop: '50px',
  },
  text: {
    width: 100,
    color: "#000000"
  },
  feedBox: {
    marginTop: theme.spacing(5),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: 500,
    width: 1300,
    border: '1px solid #000000',
    borderRadius: '10px',
    marginLeft: '150px',
    marginRight: '20px',
    color: '#000000',
    padding: theme.spacing(2),
    overflow: 'scroll',
    
      borderbottom: '1px solid black',
    
    
    
  },
}));

const MyApp = () => {
  const classes = useStyles();
  const [hlistings, setFeeds] = useState([]);
  const [selectedOption, setSelectedOption] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    axios
      .get('http://localhost:3000/api/hlistings')
      .then((response) => {
        setFeeds(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleGenerateClick = () => {
    console.log('Generate button clicked!');
  };



  return (
    <div>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" color="inherit"></Typography>
          <div className={classes.appbarRight}>
            <FormControl className={classes.dropdown}>
             

              <InputLabel id="select-label">Sources</InputLabel>
              <Select
                labelId="select-label"
                value={selectedOption}
                onChange={handleOptionChange}
              >
                <MenuItem value="option1">Finnish Rennovation</MenuItem>
                <MenuItem value="option2">Jobs</MenuItem>
                <MenuItem value="option3">Patents</MenuItem>
                <MenuItem value="option4">Sales Announcement</MenuItem>
                <MenuItem value="option5">Plot Information</MenuItem>
              </Select>
            </FormControl>
          </div>
          <form className={classes.searchForm} noValidate autoComplete="off">
          <TextField
  label="Search"
  variant="outlined"
  className={classes.searchInput}
  value={searchQuery}
  onChange={handleSearchChange}
  inputProps={{
    maxLength: 50,
  }}
/>


           
          </form>
          <Button
            className={classes.generateButton}
            variant="contained"
            onClick={handleGenerateClick}
          >
            Preview
          </Button>
        </Toolbar>
        
       {/* Your RSS feed section goes here */
       
       <Box className={classes.feedBox}>
       <table>
{/*          <thead>
           <tr>
             <th>Title</th>
             <th>Address</th>
             <th>URL</th>
             <th>Description</th>
             <th>Vendor</th>
             <th>Type</th>
             <th>Year</th>
             <th>Correction</th>
             <th>Area</th>
             <th>Price</th>
             <th>__v</th>
           </tr>
         </thead> */}
         <tbody>
           {hlistings.map(hlisting => (
             <tr key={hlisting._id}>
               <td style={{ borderBottom: '1px solid #ddd' }}>{hlisting.title}</td>
               <tr style={{ borderBottom: '1px solid #ddd', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{hlisting.address}</tr>
               <tr style={{ borderBottom: '1px solid #ddd' }}>{hlisting.url}</tr>
               <tr style={{ borderBottom: '1px solid #ddd' }}>{hlisting.datadescription}</tr>
               <tr style={{ borderBottom: '1px solid #ddd', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{hlisting.vendor}</tr>
               <tr style={{ borderBottom: '1px solid #ddd' }}>{hlisting.type}
               <td style={{ borderBottom: '1px solid #ddd' }}>{hlisting.year}</td></tr>
               <td style={{ borderBottom: '1px solid #ddd', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{hlisting.correction}</td>
               <tr style={{ borderBottom: '1px solid #ddd' }}>{hlisting.area}
               <td style={{ borderBottom: '1px solid #ddd' }}>{hlisting.price}</td></tr>
             </tr>
           ))}
         </tbody>
       </table>
     </Box>
     
     



    
     
}

      
      </AppBar>


     
    </div>
  );
};


export default MyApp;


