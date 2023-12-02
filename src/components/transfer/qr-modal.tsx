import { QrModelProps } from '../../@types/profile.types';
import QrReader from '../shared/qr-reader';

function QrModal({ setIsModalOpen, setTerminalId }: QrModelProps) {
	return <QrReader setIsModalOpen={setIsModalOpen} mutate={setTerminalId} />;
}

export default QrModal;
