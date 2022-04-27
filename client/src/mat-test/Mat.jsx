import React, { useState, useRef } from 'react'
// import { ToggleButton, ToggleButtonGroup } from '@mui/material'
// import FormatBoldIcon from '@mui/icons-material/FormatBold';
// import FormatItalicIcon from '@mui/icons-material/FormatItalic';
// import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined'
// import {TextField,InputAdornment} from '@mui/material'

// import { TextField, MenuItem, Select } from '@mui/material';
// import { FormControl, FormLabel, RadioGroup,FormControlLabel,Radio } from '@mui/material';


import { Checkbox, FormGroup, FormControlLabel } from '@mui/material';

function Mat() {
    // const [formats, setFormats] = React.useState(() => ['bold', 'italic']);

    // const handleFormat = (event, newFormats) => {
    //     setFormats(newFormats);
    // };

    // const [focused, setFocused] = React.useState(false);
    // const onFocus = () => setFocused(true);
    // const onBlur = () => setFocused(false);
    // const [inputValue , setInputValue] = useState("");
    // const userNameRef=useRef(null);

    // const [age, setAge] = useState([])
    // console.log(age) 

    // const[radioValue, setRadioValue]=useState('')
    // console.log(radioValue)

    // const [checkedValues, setCheckedValues] = useState([])
    // const handleChecked = (e) => {
    //     const index = checkedValues.indexOf(e.target.value);
    //     if (index === -1) {
    //         setCheckedValues([...checkedValues, e.target.value])
    //     }
    //     else setCheckedValues(checkedValues.filter((c) => c !== e.target.value))

    // }
    // console.log({ checkedValues })


    return (
        <>
            {/* <ToggleButtonGroup
                color='primary'
                value={formats}
                onChange={handleFormat}
                aria-label="text formatting">
                <ToggleButton value="bold" aria-label="bold"><FormatBoldIcon /></ToggleButton>
                <ToggleButton value="italic" aria-label="italic"><FormatItalicIcon /></ToggleButton>
                <ToggleButton value="underlined" aria-label="underlined"><FormatUnderlinedIcon /></ToggleButton>
            </ToggleButtonGroup> */}


            {/* <TextField label='distance' InputProps={{
                endAdornment:<InputAdornment postion='end'>cm</InputAdornment>
            }}/> */}


            {/* <TextField
                ref={userNameRef}
                label='Name'
                onFocus={onFocus}
                error={!inputValue && focused}
                helperText={!inputValue && focused? 'password is Required' : ''}
                onChange={(e)=>setInputValue(e.target.value)}
                onBlur={onBlur}
            /> */}

            {/* <Select
                label='Age'
                fullWidth
                value={age}
                onChange={(e) => setAge( e.target.value)}
                multiple
            >
                <MenuItem value='10'>10</MenuItem>
                <MenuItem value='20'>20</MenuItem>
            </Select> */}

            {/* <FormControl>
                <FormLabel id="job-exp-group-label">Years of experience</FormLabel>
                <RadioGroup
                    name='job-exp-group'
                    aria-labelledby="ob-exp-group-label"
                    value={radioValue}
                    onChange={(e)=>setRadioValue(e.target.value)}
                >
                    <FormControlLabel value="0-2" control={<Radio/>} label="0-2" />
                    <FormControlLabel value="3-5" control={<Radio />} label="3-5" />
                    <FormControlLabel value="6-10" control={<Radio />} label="6-10" />
                </RadioGroup>
            </FormControl> */}


            {/* <FormGroup>
                <FormControlLabel label="check one"
                    control={<Checkbox checked={checkedValues.includes('one')} onChange={handleChecked} value='one' />} />
                <FormControlLabel label="check two"
                    control={<Checkbox checked={checkedValues.includes('two')} onChange={handleChecked} value='two' />} />
            </FormGroup> */}


        </>

    )
}

export default Mat