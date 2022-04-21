import faker from 'faker';
import { sample } from 'lodash';
// utils

// ----------------------------------------------------------------------

const users = [...Array(15)].map((_, index) => ({
  id: faker.datatype.uuid(),
  startdate: "5 Feb 2022",
  starttime: "09:30:00",
  name: faker.name.findName(),
  marks: faker.datatype.number(),
  section: sample([
    "A1",
  "A2",
  "B1",
  "B2",
  "C1",
  "C2",
  "D1"
]),
  branch: sample([
    'CSE',
    'MECH',
    'IT',
    'ESE'
  ])
}));

export default users;