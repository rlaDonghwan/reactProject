import type { ChangeEvent } from 'react'
import { useState, useCallback } from 'react'
import { Title } from '../components'
import { Input } from '../theme/daisyui'

export default function InputTest() {
  // 문자열 값을 저장하기 위한 상태 변수
  const [value, setValue] = useState<string>('')
  // 체크박스 상태를 저장하기 위한 상태 변수
  const [checked, setChecked] = useState<boolean>(false)

  // 입력 값이 변경될 때 호출되는 함수
  const onChangeValue = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    //console.log(e.target.value)
    setValue((notUsed) => e.target.value)
  }, [])

  // 체크박스 상태가 변경될 때 호출되는 함수
  const onChangeChecked = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    //console.log(e.target.checked)
    setChecked((notUsed) => e.target.checked)
  }, [])

  return (
    <section className="mt-4">
      <Title>InputTest</Title>
      <div className="flex items-center justify-center p-4 mt-4">
        {/* 텍스트 입력 필드 */}
        <Input
          type="text"
          value={value}
          onChange={onChangeValue}
          className="input-primary input-sm"
        />
        {/* 체크박스 입력 필드 */}
        <Input
          type="checkbox"
          checked={checked}
          onChange={onChangeChecked}
          className="ml-4 checkbox checkbox-primary input-sm"
        />
      </div>
    </section>
  )
}
