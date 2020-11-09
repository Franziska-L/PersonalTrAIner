import React from 'react';
import './style/App.scss';
import {Container} from 'react-bootstrap';
import { BrowserRouter as Router, Route} from 'react-router-dom';

// Components
import Header from './components/Header';
import WelcomeScreen from './components/WelcomeScreen';
import SetUp from './components/SetUp';
import ExerciseScreen from './components/ExerciseScreen';
import FinishScreen from "./components/FinishScreen";
import './fonts/Quicksand-Regular.ttf';
import './fonts/Quicksand-Bold.ttf';

class App extends React.Component {
  state = {
    name: "",
    exercises: [
      {
        id: 1,
        name: "Bicep Curl",
        group: "arms",
        selected: false,
        allSelected: false,
        completed: false,
      },
      {
        id: 2,
        name: "Shoulder Press",
        group: "arms",
        selected: false,
        allSelected: false,
        completed: false
      },
      {
        id: 3,
        name: "Butterfly",
        group: "arms",
        selected: false,
        allSelected: false,
        completed: false
      },
      {
        id: 4,
        name: "Side Lunge",
        group: "legs",
        selected: false,
        allSelected: false,
        completed: false,
      },
      {
        id: 5,
        name: "Standing Leg Deadlift",
        group: "legs",
        selected: false,
        allSelected: false,
        completed: false,
      },
      {
        id: 6,
        name: "Standing Leg Lift",
        group: "legs",
        selected: false,
        allSelected: false,
        completed: false,
      },

    ],
    currentExercise: "",
  }

  // triggered when checkbox for an exercise in setup-screen changes
  selectExercise = (id) => {
    this.setState( { exercises: this.state.exercises.map( exercise => {
      if (exercise.id === id){
        exercise.selected = !exercise.selected;
        this.changeSelectedState(exercise.selected, exercise.group);
      }
      console.log(exercise)
      return exercise;
    })});
  }

  changeSelectedState = (isSelected, group) => {
    this.setState( { exercises: this.state.exercises.map( exercise => {
        if (exercise.group === group && !isSelected && exercise.allSelected) {
          document.getElementById(exercise.group).checked = false;
          exercise.allSelected = false;
        }
      })});
  }

  selectGroup = (group) => {
    this.state.exercises.map((exercise) => {
      if (exercise.group === group) {
        if (exercise.allSelected) {
          document.getElementById(exercise.id).checked = false;
          exercise.allSelected = false;
          exercise.selected = false;
        } else {
          document.getElementById(exercise.id).checked = true;
          exercise.allSelected = true;
          exercise.selected = true;
        }
      }
      return exercise
    })
  }

  // triggered when exercise is completed in exercise-screen
  exerciseCompleted = (name) => {
    console.log(name)
    document.getElementById("doneModal").style.display = "none"
    if (name !== undefined && this.state.exercises) {
      this.setState( { exercises: this.state.exercises.map( exercise => {
          if (exercise.name === name) {
            exercise.completed = true;
          }
          this.findNextExercise(false)
        })});
    }
  }
  
  // finds next selected exercise that is not completed yet
  findNextExercise = (isFirst) => {
    let nextExercise = this.state.exercises.find( (exercise) => {
       return exercise.selected && !exercise.completed
    });
    if (nextExercise !== undefined){
      localStorage.setItem('currentExercise', nextExercise.name)
      if (!isFirst) {
        window.location.reload()
      }
    }
  }
  hasNextExercise = (currentExercise) => {
    let nextExercise = this.state.exercises.find( (exercise) => {
        return exercise.selected && !exercise.completed && exercise.name !== currentExercise
    });
    console.log(nextExercise)
    if (nextExercise !== undefined){
      return true
    } else {
      return false
    }
  }

  render() {

    return(
      <Router>
        <div className="App">
        <Header></Header>
        <Route exact path='/'>
          <WelcomeScreen></WelcomeScreen>
        </Route>
        <Route path='/setup'>
          <SetUp
             selectExercise={this.selectExercise}
             selectGroup={this.selectGroup}
             exercises= {this.state.exercises}
             findNextExercise = {this.findNextExercise}>
          </SetUp>
        </Route>
        <Route path='/training'>
          <ExerciseScreen
              exerciseCompleted = {this.exerciseCompleted}
              hasNextExercise   = {this.hasNextExercise}  >
          </ExerciseScreen>
        </Route>
        <Route path='/finish'>
          <FinishScreen></FinishScreen>
        </Route>
          <Container fluid className="footerContent">
            <p>&copy; PersonalTr<b>AI</b>ner 2020</p>
          </Container>
        </div>
      </Router>
      

    );
  }
}


export default App;



