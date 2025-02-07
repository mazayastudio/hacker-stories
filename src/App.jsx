import {useEffect, useState} from "react";


const useStorageState = (key, initialState) => {
  const [value, SetValue] = useState(localStorage.getItem(key) || initialState);

  useEffect(() => {
    localStorage.setItem('value', value)
  }, [value, key]);

  return [value, SetValue];
}

function App() {
  const stories = [
    {
      title: 'React',
      url: 'https://react.dev/',
      author: 'Jordan Walke',
      num_comments: 3,
      points: 4,
      objectID: 0
    },
    {
      title: 'Redux',
      url: 'https://redux.js.org/',
      author: 'Dan Abramov, Andrew Clark',
      num_comments: 2,
      points: 5,
      objectID: 1
    }
  ]

  const [search, setSearch] = useStorageState('search', '')

  const handleSearch = event => setSearch(event.target.value)
  const searchStories = stories.filter(story => story.title.toLowerCase().includes(search.toLowerCase()))


  return (
    <div>
      <h1>My Hacker Stories</h1>

      <InputTextWithLabel
        id='search'
        value={search}
        onInputChange={handleSearch}
        children
      >
        <strong>Search: </strong>
      </InputTextWithLabel>
      <hr/>
      <List stories={searchStories}/>

    </div>
  )
}

const InputTextWithLabel = ({id, value, onInputChange, children}) => {

  return (
    <>
      <label htmlFor={id}>{children}</label>
      <input
        type='text'
        id={id}
        onChange={onInputChange}
        value={value}
      />
    </>
  )
}

const List = ({stories}) => {
  return (
    <ul>
      {stories.map(story =>
        <Item
          key={story.objectID}
          story={story}
        />
      )}
    </ul>
  )
}

const Item = ({story}) => {
  return (
    <li>
      <span>
        <a href={story.url}>{story.title}</a>
      </span>
      <span>{story.author}</span>
      <span>{story.num_comments}</span>
      <span>{story.points}</span>
    </li>
  )
}
export default App