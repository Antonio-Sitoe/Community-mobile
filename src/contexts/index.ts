import { create } from 'zustand'

interface ICounter {
	counter: number
	increaseCounter: () => void
}

export const useCounter = create<ICounter>()((set) => ({
	counter: 0,
	increaseCounter: () => set((state) => ({ counter: state.counter + 1 })),
}))
