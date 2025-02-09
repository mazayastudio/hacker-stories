import {useEffect, useRef, useState} from "react";
import {useStorageState} from "./hooks/useStorageState";

function App() {
  const initialStories = [{
    title: 'React', url: 'https://react.dev/', author: 'Jordan Walke', num_comments: 3, points: 4, objectID: 0
  }, {
    title: 'Redux',
    url: 'https://redux.js.org/',
    author: 'Dan Abramov, Andrew Clark',
    num_comments: 2,
    points: 5,
    objectID: 1
  }]

  const getAsyncStories = () =>
    new Promise(resolve =>
      setTimeout(() =>
        resolve({data: {stories: initialStories}}), 2000))
  const [search, setSearch] = useStorageState('search', '')
  const [stories, setStories] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    getAsyncStories().then(res => {
      setStories(res.data.stories)
      setIsLoading(false)
    })
  }, []);
  const handleSearch = event => setSearch(event.target.value)
  const searchStories = stories.filter(story => story.title.toLowerCase().includes(search.toLowerCase()))
  const handleRemoveStory = item => {
    const newStories = stories.filter(story => story.objectID !== item.objectID)
    setStories(newStories)
  }

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
      {
        isLoading ? <p>Loading...</p> :
          <List
            stories={searchStories}
            isDelete={handleRemoveStory}
          />
      }

    </div>
  )
}

const InputTextWithLabel = ({id, type = 'text', value, onInputChange, isFocused, children}) => {
  const inputRef = useRef(null);

  useEffect(() => {
    (isFocused && inputRef.current) ? inputRef.current.focus() : null;
  }, [isFocused]);

  return (<>
    <label htmlFor={id}>{children}</label>
    <input
      id={id}
      type={type}
      value={value}
      onChange={onInputChange}
      ref={inputRef}
      autoFocus={isFocused}
    />
  </>)
}

const List = ({stories, isDelete}) => {
  return (<ul>
    {stories.map(story => <Item
      key={story.objectID}
      story={story}
      isDelete={isDelete}
    />)}
  </ul>)
}

const Item = ({story, isDelete}) => {
  return (<li>
      <span>
        <a href={story.url}>{story.title}</a>
      </span>
    <span>{story.author}</span>
    <span>{story.num_comments}</span>
    <span>{story.points}</span>

    <button
      type='button'
      onClick={() => isDelete(story)}
    >x
    </button>
  </li>)
}
export default App