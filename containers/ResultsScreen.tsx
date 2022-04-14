import { Text } from "native-base";
import { Dispatch, SetStateAction } from "react";

type ResultsScreenProps = {
    onContinue: Dispatch<SetStateAction<"selection" | "results">>;
}

const ResultsScreen = ({ onContinue }: ResultsScreenProps) => {
    return (
        <Text>Hello world</Text>

    );
};

export default ResultsScreen;
