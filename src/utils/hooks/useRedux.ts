import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import type { TRootState, TAppDispatch } from '../../services/types';

export const useAppDispatch = () => useDispatch<TAppDispatch>();
export const useAppSelector: TypedUseSelectorHook<TRootState> = useSelector;
