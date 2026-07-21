import React from 'react'
import Memo from "./memo/Memo"
import UseMemoHook from './usememo/UseMemo'
import UseCallBackhook from './usecallback/UseCAllback'

const App = () => {
  return (
    <div>
      {/* <Memo /> */}
      {/* <UseMemoHook /> */}
      <UseCallBackhook />
    </div>
  )
}

export default App