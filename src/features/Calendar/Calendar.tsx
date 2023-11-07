import * as React from "react";
import { Calendar } from "@/components/ui/Calendar";
import Modal from 'react-modal';
import { convertToGMT545, itemIsInLocalStorage, getItemsIfAlreadyPresent } from "@/lib/utils";

export default function CalendarPage() {

  const [dates, setDates] = React.useState<Date[]>([]); // Initialize as an empty array
  const [selectedDates, setSelectedDates] = React.useState<Date[]>([]); // Initialize as an empty array
	const [displayDay,setDisplayDay] = React.useState<Date>();
	const bookedStyle = { border: '2px solid red' };
	const [localName,setLocalName] = React.useState("")
	const [showForm, setShowForm] = React.useState(false);
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(undefined);
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  React.useEffect(() => {
    async function fetchData() {
      try {
				console.log(itemIsInLocalStorage(),"tftf")

				if(!itemIsInLocalStorage()){
					// Make a GET request to the API using async/await
					const response = await fetch("https://date.nager.at/api/v3/PublicHolidays/2023/US");
					const data = await response.json();
					localStorage.setItem("holidays", JSON.stringify(data));
					// Extract the relevant dates from the API response
					const selectedDates = data.map((holiday: { date: string | number | Date; }) => new Date(holiday.date));

					// Update the state with the selected dates
					setDates(selectedDates);
				}else{
					console.log(getItemsIfAlreadyPresent(),"GET GET")
					setDates(getItemsIfAlreadyPresent())
				}}
				catch (error) {
					console.error("Error fetching data from the API: ", error);
				}
    }
    fetchData();
  }, []); // Run this effect once when the component mounts

  const handleDateSelect = (selectedDates: Date[] | undefined) => {
    if (selectedDates) {
      console.log(selectedDates);
      setSelectedDates(selectedDates);
    }
  };

	const openModal = () => {
    setIsModalOpen(true);
  };

	const handleCellClick = (day: Date | undefined) => {
		if (day) {
			const storedHolidays = JSON.parse(localStorage.getItem("holidays") || "[]");
			const matchingHoliday = storedHolidays.find(
				(holiday: { date: string }) => {
					console.log(convertToGMT545(day),"D")
					return holiday.date === convertToGMT545(day)
				}
			);

			setDisplayDay(day);

			if (matchingHoliday) {
				setLocalName(matchingHoliday.localName);
			} else {
				openModal()
			}
			setShowForm(true);
			setSelectedDate(day);
		}
	};

	const closeModal = () => {
    setIsModalOpen(false);
  };
	
	const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Create a new holiday object with the selected date and the entered localName
    const newHoliday = {
      date: convertToGMT545(selectedDate),
      localName: localName,
      name: localName, // You mentioned name should be the same as localName
      countryCode: 'US', // Default value
      fixed: false, // Default value
      global: true, // Default value
      counties: null, // Default value
      launchYear: null, // Default value
      types: ['Public'], // Default value
    };

    // You can now use newHoliday as needed (e.g., save to an array or perform other actions)
    // For now, we'll just reset the form
    setLocalName('');
    setShowForm(false);
		const d = JSON.parse(localStorage.getItem("holidays") || "[]")
		d.push(newHoliday)
		localStorage.setItem("holidays", JSON.stringify(d));
		closeModal()
  };

  return (
		<>
      <div className="text-lg font-semibold">
        {displayDay ? displayDay.toDateString() : "Click on date to get info"}
      </div>
      <div>{`Holiday Name :  ${localName}`}</div>
      {showForm && (
        <Modal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          contentLabel="Enter holiday name"
          style={{
            content: {
              maxWidth: '400px',
              maxHeight: '200px',
              margin: 'auto',
              padding: '20px',
              borderRadius: '10px',
              border: 'none',
              boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)',
            },
            overlay: {
              backgroundColor: 'rgba(0, 0, 0, 0.7)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            },
          }}
        >
          <h4 className="p-2 text-center">Enter holiday name to save for the day:</h4>
          <form onSubmit={handleFormSubmit} className="flex flex-col items-center space-y-4">
            <input
              type="text"
              placeholder="Enter holiday name"
              value={localName}
              onChange={(e) => setLocalName(e.target.value)}
              className="p-2 border border-gray-300 rounded"
            />
            <input type="hidden" name="selectedDate" value={selectedDate} />
            <button
              type="submit"
              className="p-2 bg-blue-500 text-white rounded hover:bg-blue-700 cursor-pointer"
            >
              Save
            </button>
          </form>
					<h6 className="text-xs">*Press esc to cancel</h6>
        </Modal>
      )}
			<Calendar
				mode="multiple"
				selected={selectedDates}
				modifiers={{ booked: dates }}
				modifiersStyles={{ booked: bookedStyle }}
				onSelect={handleDateSelect}
				className="rounded-md border shadow"
				onDayClick={handleCellClick}
			/>
    </>
  );
}
