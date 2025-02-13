const list = [
  {
    title       : 'React',
    url         : 'https://react.dev/',
    author      : 'Jordan Walke',
    num_comments: 3,
    points      : 4,
    objectID    : 0,
  },
  {
    title       : 'Redux',
    url         : 'https://redux.js.org/',
    author      : 'Jordan Walke',
    num_comments: 2,
    points      : 5,
    objectID    : 1,
  }
]

export default function App() {

  return (
    <div>
      <h1>My Hacker Stories</h1>

      <Search />

      <hr />

      <List />
    </div>
  )
}

const Search = () => {
  return (
    <>
      <label htmlFor="search">Search:</label>
      <input type="text" id="search" />
    </>
  )
}

const List = () => {
  return (
    <ul>
      {list.map((item) => <Item key={item.objectID} item={item} />)}
    </ul>
  )
}
const Item = ({item}) => {
  return (
    <li>
      <span>
        <a href={item.url}>{item.title}</a>
      </span>
      <span>{item.author}</span>
      <span>{item.num_comments}</span>
      <span>{item.points}</span>
    </li>
  )
}