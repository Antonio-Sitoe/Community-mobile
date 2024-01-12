import { create } from 'zustand'

interface ICounter {
	counter: number
	increaseCounter: () => void
}

export const useCounter = create<ICounter>()((set) => ({
	counter: 0,
	increaseCounter: () => set((state) => ({ counter: state.counter + 1 })),
}))

export interface ICoords {
	latitude: number
	longitude: number
}
interface GlobalProps {
	location: null | ICoords
	errorMsg: string
	setLocation(obj: ICoords): void
	setErrorMsg(message: string): void
}

export const useGlobalStore = create<GlobalProps>()((set) => ({
	location: null,
	errorMsg: '',
	setLocation: (location) => set(() => ({ location })),
	setErrorMsg: (message: string) => set(() => ({ errorMsg: message })),
}))
