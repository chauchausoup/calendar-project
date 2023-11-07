import * as React from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";

export default function CalendarPage() {
  const [dates, setDates] = React.useState<Date[]>([]); // Initialize as an empty array
  const [datesS, setDatesS] = React.useState<Date[]>([]); // Initialize as an empty array
	const [dayM,setDayM] = React.useState<Date>();
	const bookedStyle = { border: '2px solid red' };
	const [localName,setLocalName] = React.useState("")

 
  React.useEffect(() => {
    async function fetchData() {
      try {
        // Make a GET request to the API using async/await
        const response = await fetch("https://date.nager.at/api/v3/PublicHolidays/2023/US");
        const data = await response.json();
				localStorage.setItem("holidays", JSON.stringify(data));
        // Extract the relevant dates from the API response
        const selectedDates = data.map((holiday: { date: string | number | Date; }) => new Date(holiday.date));

        // Update the state with the selected dates
        setDates(selectedDates);
      } catch (error) {
        console.error("Error fetching data from the API: ", error);
      }
    }

    fetchData();
  }, []); // Run this effect once when the component mounts

  const handleDateSelect = (selectedDates: Date[] | undefined) => {
    if (selectedDates) {
      console.log(selectedDates);
      setDatesS(selectedDates);
    }
  };

  const handleButtonClick = () => {
    // Update the 'dates' array with new items from the 'datesS' array
    setDates((prevDates) => [...prevDates, ...datesS]);
    // Clear the 'datesS' array
    setDatesS([]);
  };

function convertToGMT545(usDateString : Date | string) {
  // Create a Date object from the US time zone date string
  const usDate = new Date(usDateString);

  // Calculate the time difference for GMT+5:45
  const gmt545Offset = 5 * 60 * 60 * 1000 + 45 * 60 * 1000;

  // Calculate the equivalent time in GMT+5:45
  const gmt545Date = new Date(usDate.getTime() + gmt545Offset);

  // Convert the GMT+5:45 date back to a string in the desired format (YYYY-MM-DD)
  const gmt545DateString = gmt545Date.toISOString().split('T')[0];

  return gmt545DateString;
}

const handleM = (day: Date | undefined) => {
  console.log(day, "dadadadada");
  if (day) {
    const storedHolidays = JSON.parse(localStorage.getItem("holidays") || "[]");

    const matchingHoliday = storedHolidays.find(
      (holiday: { date: string }) => {
				console.log(convertToGMT545(day),"D")
				return holiday.date === convertToGMT545(day)
			}
    );

      console.log(matchingHoliday, "MAMAMAMAMAM");

    if (matchingHoliday) {
      setLocalName(matchingHoliday.localName);
    } else {
      setDayM(day);
    }
  }
};

  return (
    <>
		<Button onClick={handleButtonClick}>Add Holidays</Button>
		<br/>
				<>{dayM ? dayM.toDateString() : "Click on date to get info"}</>
				<>{localName}</>
      <Calendar
        mode="multiple"
        selected={datesS}
				modifiers={{ booked: dates }}
				modifiersStyles={{ booked: bookedStyle }}
				// disabled={dates}
        onSelect={handleDateSelect}
        className="rounded-md border shadow"
				onDayClick={handleM}
      />
    </>
  );
}
