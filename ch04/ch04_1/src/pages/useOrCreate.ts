const cache: Record<string, any> = {}

// 주어진 키로 캐시에서 값을 가져오거나, 존재하지 않는 경우 제공된 콜백을 사용하여 값을 생성합니다.
export const useOrCreate = <T>(key: string, callback: () => T): T => {
  if (!cache[key]) cache[key] = callback() // 캐시에 값이 존재하지 않을 경우 값을 생성하여 캐시에 저장합니다.
  return cache[key] as T // 캐시에서 값을 가져오거나 생성된 값을 반환합니다.
}
