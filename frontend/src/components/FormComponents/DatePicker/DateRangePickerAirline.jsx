import React, { useState ,useEffect , useRef, useMemo} from "react"
import TimeSelector from './components/TimeSelector';
import DatePicker , { DateObject } from "react-multi-date-picker"
import './DateRangePicker.css'
import Toolbar from "react-multi-date-picker/plugins/toolbar"
import weekends from "react-multi-date-picker/plugins/highlight_weekends"
import transition from "react-element-popper/animations/transition"
import opacity  from "react-element-popper/animations/opacity"
import { format} from "date-fns";
import { FcClock } from 'react-icons/fc';



const DateRangePicker = ({ currentDepDate, currentArrDate }) => {
  const datePickerRef = useRef(null)
  const dates = useRef(null)



  const [calPosition, setCalPosition,] = useState("right-center")
  const [timeOnly, setTimeOnly] = useState(false)
  const [numberOfMonths, setNumberOfMonths] = useState(2)
  
  useEffect(() => {

    //Initial screen width   
 
    if (window.matchMedia('(max-width: 900px)').matches) {
    setNumberOfMonths(1)
    setCalPosition("top-end")} 

  }, [])


  // Set listener for screen change
  const mql = window.matchMedia('(max-width: 900px)');
  mql.onchange = (e) => { 
    if(e.matches) {
      setNumberOfMonths(1) 
      setCalPosition("top-end")}
    else  {
        setNumberOfMonths(2) 
        setCalPosition("right-center")}
    }

  //checks if the component runs the first time and loads the dates , 
  //fix for dates restored to default every render 
  currentDepDate && !(datePickerRef.current)?  
    dates.current =  [
      new DateObject(new Date(currentDepDate).toISOString().replace('T', ' ')),
      new DateObject(new Date(currentArrDate).toISOString().replace('T', ' '))
      ]:<></>

  return (

      <DatePicker 
        ref={datePickerRef} 
        value ={ dates.current  }

        containerClassName="date-time-picker" 
        render={<CustomRangeInput dates = {dates} datePickerRef = { datePickerRef } setTimeOnly = { setTimeOnly }/>}
        animations={[
            opacity(), 
            transition({ from: 35, duration: 800 })       
          ]} 
          onChange={(e) => dates.current = e}
          portal 
          numberOfMonths={ numberOfMonths }
          range
          disableDayPicker = { timeOnly }
          calendarPosition = { calPosition }
          format="DD/MM/YY HH:mm"   
          minDate={new Date().toISOString().replace('T', ' ')} 
          plugins={[
    
          timeOnly?<TimeSelector />:<></>,

          <Toolbar 
            position="bottom"
            names ={{
            today: "TODAY",
            deselect: "CLEAR",
            close: "SELECT"
            }}
            />,

            weekends([6]),
            
          ]}
        >
      </DatePicker>
         
    )
  }


  
const CustomRangeInput = ({dates , value, datePickerRef, setTimeOnly }) => {
  let datePickerRefCurrent = datePickerRef.current
  let datesCurrent = dates?.current

    return (
      <>
 
        {/* hidden inputs for form data collection 
         the format is different from display inputs */} 

        <input 
            type='datetime-local' 
            id='departure_time' 
            name='departure_time'
            required 
            readOnly 
            hidden 
            value= {datesCurrent && datesCurrent[0]?format(new Date(datesCurrent[0]), "yyyy-MM-dd HH:mm") : ""} 
        />

        <input 
          type='datetime-local' 
          id='landing_time'
          name='landing_time'
          required 
          readOnly 
          hidden 
          value= {datesCurrent && datesCurrent[1]?format(new Date(datesCurrent[1]), "yyyy-MM-dd HH:mm") : ""}
        />



        {/* fakeForm is added so those inputs are not included in form submit. 
          those are diplay only */}
        <input
            className='date-input-dep'
            form="fakeForm"
            value={value[0]?value[0].slice(0 ,8): ""}
            readOnly
            placeholder="&#x1F4C5; Deaprture"
            onClick = {(e) => 
              datePickerRefCurrent.isOpen? (
                setTimeOnly(false)):
                (datePickerRefCurrent.openCalendar(),
                setTimeOnly(false)
                ) 
            }
        />
  
        {/* < FcClock /> */}
  
        <input
            className='date-input-time'
            form="fakeForm"
            value={value[0]? value[0].slice(-5): ""}
            readOnly
            disabled = {!value[0]}
            placeholder="&#128336; Time"
            onClick = {() =>
                datePickerRefCurrent.isOpen? 
                (setTimeOnly(true)):
                (datePickerRefCurrent.openCalendar(),
                  setTimeOnly(true))
    
            }
        />
        {/* <div class="cal-icon1"><BsFillCalendarDayFill /></div> */}
  
        <input      
          className='date-input-arr'
          form="fakeForm"
          placeholder="&#x1F4C5; Arival"
          value={value[1]? value[1].slice(0 ,8): ""}
          readOnly
          onClick = {() =>
            datePickerRefCurrent.isOpen? 
            (setTimeOnly(false)):
            (datePickerRefCurrent.openCalendar(),
              setTimeOnly(false))
        }
        />
  
        <input
            className='date-input-time'
            form="fakeForm"
            value={value[1]? value[1].slice(-5): ""}
            readOnly
            disabled = {!value[1]}
            placeholder="&#128336; Time"
            onClick = {() =>
              datePickerRefCurrent.isOpen? 
              (setTimeOnly(true)):
              (datePickerRefCurrent.openCalendar(),
                setTimeOnly(true))
          }
          />
        {/* <i class="cal-icon2"><BsFillCalendarDayFill /></i> */}
  
    </>
    )

  }
  
  
export default DateRangePicker

