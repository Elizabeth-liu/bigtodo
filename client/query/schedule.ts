import { gql } from "apollo-boost"

const SCHEDULES_QUERY = gql`
  query($date: String!){
    schedules(date: $date) {
      id 
      taskName
      plannedTime,
      date
    }
  }
`
const SCHEDULES_CREATE = gql`
  mutation($args: CreateInput!){
    createSchedule(args: $args) {
      id,
      taskName, 
      date,
      plannedTime
    }
  }
  `

const SCHEDULES_UPDATE = gql`
  mutation($args: UpdateInput!){
    updateSchedule(args: $args) {
      id,
      taskName, 
      date,
      plannedTime
    }
  }
  `

 const SCHEDULES_DELETE = gql`
  mutation($id: String!){
    deleteSchedule(id: $id) {
      id
    }
  }
  `

  export { SCHEDULES_QUERY,  SCHEDULES_CREATE, SCHEDULES_UPDATE, SCHEDULES_DELETE }