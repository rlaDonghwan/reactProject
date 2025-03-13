import { useMemo } from 'react' // useMemo 훅을 react에서 가져옴
import { Title, Avatar } from '../components' // Title과 Avatar 컴포넌트를 '../components'에서 가져옴
import * as D from '../data' // D라는 이름으로 '../data'의 모든 내용을 가져옴

export default function Memo() {
  // prettier-ignore
  const headTexts = useMemo<string[]>(() => [
    'No.', 'Name', 'Job Title', 'Email Adress'
  ], []) // headTexts 배열을 useMemo 훅을 사용하여 생성

  const users = useMemo<D.IUser[]>(
    () => D.makeArray(100).map(D.makeRandomUser),
    []
  ) // users 배열을 useMemo 훅을 사용하여 100명의 랜덤 유저로 생성

  const head = useMemo(
    () => headTexts.map((text) => <th key={text}>{text}</th>),
    [headTexts]
  ) // headTexts 배열을 <th> 요소로 변환하여 head 변수에 저장

  const body = useMemo(
    () =>
      users.map((user, index) => (
        <tr key={user.uuid}>
          <th>{index + 1}</th>
          <td className="flex items-center">
            <Avatar src={user.avatar} size="1.5rem" />
            <p className="ml-2">{user.name}</p>
          </td>
          <td>{user.jobTitle}</td>
          <td>{user.email}</td>
        </tr>
      )),
    [users]
  ) // users 배열을 <tr> 요소로 변환하여 body 변수에 저장

  return (
    <div className="mt-4">
      <Title>Memo</Title> {/* Title 컴포넌트를 사용하여 제목 표시 */}
      <div className="p-4 mt-4 overflow-x-auto">
        <table className="table w-full table-zebra table-compact">
          <thead>
            <tr>{head}</tr> {/* head 배열을 <tr> 요소로 표시 */}
          </thead>
          <tbody>{body}</tbody> {/* body 배열을 <tbody> 요소로 표시 */}
        </table>
      </div>
    </div>
  )
}
