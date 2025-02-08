import {useEffect, useRef} from "react";
import {useStorageState} from "./hooks/useStorageState";

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
      >
        <strong>Search: </strong>
      </InputTextWithLabel>
      <hr/>
      <List stories={searchStories}/>

    </div>
  )
}

const InputTextWithLabel = ({id, type = 'text', value, onInputChange, isFocused, children}) => {
  const inputRef = useRef(null);

  useEffect(() => {
    (isFocused && inputRef.current) ? inputRef.current.focus() : null;
  }, [isFocused]);

  return (
    <>
      <label htmlFor={id}>{children}</label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={onInputChange}
        ref={inputRef}
        autoFocus={isFocused}
      />
    </>
  )
}

const List = ({stories, isDelete}) => {
  return (
    <ul>
      {stories.map(story =>
        <>
          <Item
            key={story.objectID}
            story={story}
          />
          <button
            type='button'
            onClick={isDelete}
          >x
          </button>
        </>
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