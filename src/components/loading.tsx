import ReactLoading from 'react-loading';
import type { LoadingType } from 'react-loading';

interface LoadingProps {
  type: LoadingType;
  color: string;
  height: number;
  width: number;
}

const Loading = ({ type, color, height, width }: LoadingProps) => {
  return (
    <div className="flex justify-center items-center">
      <ReactLoading type={type} color={color} height={height} width={width} />
    </div>
  );
};

export default Loading;