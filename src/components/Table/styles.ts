import styled from 'styled-components'

export const OverflowY = styled.div`
  overflow-y: auto;
  height: 480px;

  ::-webkit-scrollbar-track {
    background-color: #4b4d63;
    border-radius: 1rem;
  }
  ::-webkit-scrollbar {
    width: 6px;
  }
  ::-webkit-scrollbar-thumb {
    background: #b3b5c6;
    border-radius: 1rem;
  }
`
