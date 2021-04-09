# Scheduler

The purpose of the project is to schedule possible meeting times for 2 individuals,
based on their already booked schedules and a given meeting length.

![image](https://user-images.githubusercontent.com/33229394/114223935-178ad880-9979-11eb-862e-643e74fd38d8.png)

Users can select an upper and lower bound for both schedules,
and also a list of timeslots which represent periods of unavailability. 

Finally, a meeting length is given, after which common timeslots for both schedules can be determined. 

![image](https://user-images.githubusercontent.com/33229394/114224976-756bf000-997a-11eb-87b3-31f163443c7c.png)

The application uses a client-server architecture, with the frontend using React.js and the backend
being based on Flask. 

On the frontend side, we have a simple set of input forms through which we can query the relevant data.
We use 3 React components for this - the central one, `App` which holds the app state, `RangeInput` which contains the forms
for the schedule upper & lower bounds, and `CalendarInput` which allows the user to fill in their schedule.

`RangeInput` contains 2 time input forms, and potentially displays an error message in case 
the selected time points do not represent a valid timeslot.

 ![image](https://user-images.githubusercontent.com/33229394/114225595-30948900-997b-11eb-9989-0abad0e65b90.png)

`CalendarInput` also contains 2 time inputs which get added to a schedule list whenever the `Add` button is pressed.
The list can be cleared by pressing `Clear`.

![image](https://user-images.githubusercontent.com/33229394/114225813-76e9e800-997b-11eb-8361-9e7102dbf89b.png)

Once the forms are completed, there's a call being made to the backend server with the user data:
(note that there's no thorough validation for all the input data)

![image](https://user-images.githubusercontent.com/33229394/114226686-8ddd0a00-997c-11eb-9627-7833132b4a1b.png)

Times in timeslots are separated through '.'s in string form. 

The flask server exposes a single endpoint that receives the input data and computes the meeting times.
![image](https://user-images.githubusercontent.com/33229394/114227388-984bd380-997d-11eb-8f7d-d3fda8ea3e54.png)

These functions make use of the `Timeslot` class, which represents a pair of
hh:mm timestamps:

![image](https://user-images.githubusercontent.com/33229394/114228201-bebe3e80-997e-11eb-9f57-fb1f5b984ffb.png)

The meeting times are computes by first determing the free times for both schedules, finding 
their intersections, and filtering the timeslots in which the meeting could be held.
![image](https://user-images.githubusercontent.com/33229394/114227529-c7624500-997d-11eb-8bea-10eafc9140b7.png)

Finding the free time of a schedule is done by taking the intervals between the booked ones

![image](https://user-images.githubusercontent.com/33229394/114227770-15774880-997e-11eb-994f-fc5254d007e2.png)

We can determine a common schedule between the 2 input ones by checking for the timeslots that intersect:

![image](https://user-images.githubusercontent.com/33229394/114227869-46577d80-997e-11eb-9e72-39cc9e7400eb.png)

Checking whether 2 timeslots intersect boils down to checking whether 2 intervals in the mathematical sense intersect:

![image](https://user-images.githubusercontent.com/33229394/114227960-625b1f00-997e-11eb-8374-038940e9546b.png)

# Other notes

- input validation definitely needs to be done on the time intervals to make sure they're not out of bounds
- it is not clear from the problem statement how granular the input times should be (do only 30 minute increments work? should seconds be taken into account?)
- the application could extended to take timezones into account, which could also be a point of confusion

