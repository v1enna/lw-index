import './App.css';
import React, { useEffect, useState } from 'react';
import Nav from './components/Nav/Nav';
import Graph from './components/Graph/Graph';
import GraphProps from './model/GraphProps';
import AlertProps from './model/AlertProps';
import NavProps from './model/NavProps';
import Alert from './components/Alert';
import AppStatus from './model/AppStatus';
import MacroGraph from './components/Graph/MacroGraph';
import { AppStatusSet } from './model/AppStatusSet';
import { BlankGraph } from './templates/BlankGraph';
import { DefaultAbilities } from './templates/DefaultAbilities';
import ALGOS from './templates/Algos';
import { Algo } from './model/Algo';
import { QualityGraphProps } from './model/QualityGraphProps';

function App() {
	const [graphs, setGraphs] = useState<GraphProps[]>([]);

	/* __MultiGraph Views */
	const [renderedGraphs, setRenderedGraphs] = useState<React.ReactElement[]>(
		[]
	);

	const [gid, setGid] = useState<number>(0);

	const [alertProps, setAlertProps] = useState<AlertProps>({ text: '?None' });
	const [alertStatus, setAlertStatus] = useState<boolean>(false);

	const [ability, setAbility] = useState(DefaultAbilities);

	const [selectedAlgo, setSelectedAlgo] = useState<Algo>(ALGOS[0]);

	const [appStatusSet, setAppStatusSet] = useState<AppStatusSet>({
		appStatus: AppStatus.__MultiGraph,
		graph: {
			...BlankGraph,
			algo: selectedAlgo,
		},
	});

	const [qualityGraphProps, setQualityGraphProps] =
		useState<QualityGraphProps>({ data: [] });

	const navProps: NavProps = {
		graphs: graphs,
		setGraphs: setGraphs,

		alertStatus: alertStatus,
		setAlertStatus: setAlertStatus,

		alert: alert,

		appStatusSet: appStatusSet,
		setAppStatusSet: setAppStatusSet,

		gid: gid,
		setGid: setGid,

		ability: ability,
		setAbility: setAbility,

		selectedAlgo: selectedAlgo,
		setSelectedAlgo: setSelectedAlgo,
	};

	useEffect(() => {
		let tempGraphs: React.ReactElement[] = [];

		graphs.forEach((graph) => {
			let deletableGraph = { ...graph, deleteSelf: deleteSelf };
			tempGraphs.push(<Graph key={graph.id} graph={deletableGraph} />);
		});

		setRenderedGraphs(tempGraphs);

		console.log('Aggiornamento grafici in __MultiGraph View');
		console.log(graphs);
	}, [graphs]);

	function deleteSelf(id: number) {
		let temp = graphs.filter((graph) => graph.id !== id);
		setGraphs(temp);
	}

	function alert(alertText: string, select?: boolean) {
		setAlertStatus(true);

		if (select === undefined)
			setAlertProps({
				text: alertText,
			});
		else
			setAlertProps({
				text: "Selezione dell'algoritmo",
				select: true,
				selectorProps: {
					selectedAlgo: selectedAlgo,
					setSelectedAlgo: setSelectedAlgo,
					setAlertStatus: setAlertStatus,
				},
			});
	}

	return (
		<main className={alertStatus ? 'h-v-center' : ''}>
			{alertStatus && <Alert alertProps={alertProps} />}
			<div
				onClick={() => {
					if (alertStatus) setAlertStatus(false);
				}}
				className={'main-wrapper ' + (alertStatus ? 'blurred' : '')}
			>
				<div id='content-wrapper'>
					{!graphs.length ? (
						<div id='content-logo'>
							LW
							<br />
							<span>index</span>
						</div>
					) : (
						<div id='content'>
							{appStatusSet.appStatus ===
							AppStatus.__MultiGraph ? (
								renderedGraphs
							) : (
								<MacroGraph
									graphs={graphs}
									setGraphs={setGraphs}
									graph={appStatusSet.graph}
									selectedAlgo={selectedAlgo}
									alert={alert}
									setAbility={setAbility}
									qualityGraphProps={qualityGraphProps}
									setQualityGraphProps={setQualityGraphProps}
								/>
							)}
						</div>
					)}
				</div>
				<Nav navProps={navProps} />
			</div>
		</main>
	);
}

export default App;
