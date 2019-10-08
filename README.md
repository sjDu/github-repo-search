# Gihub Repo Search

A small app which can search github repositories by query and display them as a item list.

- codesandbox: https://codesandbox.io/s/githubrepolist-m7uqd
- deploy on nelify: https://romantic-hoover-ad58e7.netlify.com/
- github: https://github.com/sjDu/github-repo-search

This project only uses `create-react-app` and `styled-component`.

This project is built in React Hooks without using any class component which makes me learned a lot for the `useEffect` technique. The React Hook is awesome for seperating different logic parts.

## How to use
To develop:
```
npm start
```

To build
```
npm run build
```

Just like `create-react-app`.

## Features

- Auto detect search: type your query in search box and wait 1 second will trigger the request.
- Waiting effect(dotted border) for Auto detect search
- Click "enter" will also trigger a request and interrupt the wait effect for Auto detect search.
- Clear button to clear current query string
- Loading effect
- Infinite scroll
- Keep search box in window.
- Show disable status when reach the Rate Limit
- Show count down for Rate Limit
- Display repo. item with full name, description and owner's avatar.
- Support link to repo.'s github page on an item.
- Support link to owner's github page on an item.
- Support on Mobile device (width 320px+ )

## Review Points

- Create a custom hook `useAutoSearch` to deal the Auto dectect search feature. :'src/components/SearchBox.js'

- Handling long and unexpected content for `Name` and `Description` fields in repo. item.

- Build a reducer for search list and write a sample unit test for the reducer.:'src/reducer/list.js', 'src/reducer/list.spec.js'

- Create a custom hook `useSearchList` to deal the search and paging feature. :'src/reducer/list.js'

- Create a custom hook `useCountdown` to seperate count down logic from searching part and auto detect search part.:'src/index.js'

- Using css to set header and search box on top of screen without mutating the html structure.

- Use #footer with `IntersectionObserver` to implement infinite scroll.:'src/index.js'

## ToDo

- Create a custom hook for infinite scroll logic.
- Display "empty result" when search success with no results.
