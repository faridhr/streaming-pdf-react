import React, { useState, useEffect } from "react";
import PdfViewer from "../components/PdfViewer";
import API from "../assets/json/api-quiz.json";
import Modal from "../components/Modal";

const axios = require("axios").default;

const Content = () => {
	useEffect(() => {
		requestAPI();
	}, []);

	const [questionNumber, setQuestionNumber] = useState(0);
	const [question, setQuestion] = useState([]);
	const [modalOpen, setModalOpen] = useState(false);

	const requestAPI = () => {
		// axios.get('/questions?limit=10&category=SQL&difficulty=medium').then(res => setQuestion(res.data));
	};

	const listOfQuiz = () => {
		let description = [];
		for (let i = 0; i < question.length; i++) {
			description.unshift("Unanswered");
		}
		return description.map((e, i) => <li key={`listQuiz_${i}`} className={`list-group-item${questionNumber === i ? " fw-bold" : ""}`}>{`${i + 1}. ${e}`}</li>);
	};

	return (
		<main className='container mt-3'>
			<div className='modal fade' id='modal-pdf' tabIndex='-1' aria-labelledby='modal-pdf-label' aria-hidden='true'>
				<div className='modal-dialog'>
					{modalOpen && (
						<Modal hideFooter={true} modalTitle='Preview'>
							<PdfViewer onLoadPdf={() => "Loading PDF file..."} src={API.sourcePdf} />
						</Modal>
					)}
				</div>
				{/* <Modal>
					<PdfViewer src={API.sourcePdf} />
				</Modal> */}
			</div>
			<div className='row'>
				<div className='col-12 mb-2'>
					<div className='d-flex justify-content-end'>
						<button className='btn btn-primary' onClick={() => setQuestionNumber(questionNumber - 1)} disabled={questionNumber === 0}>
							Previous
						</button>
						<button className='btn btn-primary ms-2' onClick={() => setQuestionNumber(questionNumber + 1)} disabled={questionNumber === question.length - 1}>
							Next
						</button>
					</div>
				</div>
				<div className='col-3'>
					<div className='card'>
						<div className='card-header fw-bold'>Daftar Soal</div>
						<ul className='list-group list-group-flush'>{listOfQuiz()}</ul>
					</div>
				</div>
				<div className='col-9'>
					<div className='card'>
						{question.length > 0 &&
							(new Array(question[questionNumber]) || []).map((e, i) => (
								<div key={`isi_soal_${i}`}>
									<div className='card-header fw-bold'>{`Soal Nomor ${questionNumber + 1}`}</div>
									<div className='card-body'>
										{/* <button type='button' class='btn btn-primary btn-sm' data-bs-toggle='modal' data-bs-target='#modal-pdf'>
											Show attachment
										</button> */}
										<div className='card-text'>
											{e.question}
											<ul className='list-group list-group-flush mt-2'>
												{e.answers.answer_a && (
													<li className='list-group-item'>
														<span className='text-capitalize'>A.</span> {e.answers.answer_a}
													</li>
												)}
												{e.answers.answer_b && (
													<li className='list-group-item'>
														<span className='text-capitalize'>B.</span> {e.answers.answer_b}
													</li>
												)}
												{e.answers.answer_c && (
													<li className='list-group-item'>
														<span className='text-capitalize'>C.</span> {e.answers.answer_c}
													</li>
												)}
												{e.answers.answer_d && (
													<li className='list-group-item'>
														<span className='text-capitalize'>D.</span> {e.answers.answer_d}
													</li>
												)}
												{e.answers.answer_e && (
													<li className='list-group-item'>
														<span className='text-capitalize'>E.</span> {e.answers.answer_e}
													</li>
												)}
												{e.answers.answer_f && (
													<li className='list-group-item'>
														<span className='text-capitalize'>F.</span> {e.answers.answer_f}
													</li>
												)}
											</ul>
										</div>
									</div>
								</div>
							))}
						<button type='button' className='btn btn-primary btn-sm' onClick={() => setModalOpen(true)} data-bs-toggle='modal' data-bs-target='#modal-pdf'>
							Show attachment
						</button>
					</div>
				</div>
			</div>
		</main>
	);
};

export default Content;
