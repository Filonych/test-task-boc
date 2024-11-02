document.addEventListener('DOMContentLoaded', function () {
	const modal = document.getElementById('modal')
	const openButton = document.querySelector('.modal__open-button')
	const closeButton = document.querySelector('.modal__close-button')
	const form = document.getElementById('modal-form')
	const submitButton = document.getElementById('modal-submit-button')
	const inputFile = document.querySelector('input[type="file"]')
	const img = document.getElementById('uploaded-logo')
	const logoAction = document.getElementById('logo-action')
	const closeIcon = document.querySelector('.modal__close-icon')
	const dropArea = document.getElementById('drop-area')
	const inputs = form.querySelectorAll('input, select')
	const inputTel = document.getElementById('tel')
	const inputEmail = document.getElementById('email')

	// Проверка формы на валидность
	const telPattern = /^\+?[0-9]{10,15}$/
	const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

	function checkFormValidity() {
		let isAllFilled = true

		inputs.forEach(input => {
			if (input.required && !input.value) {
				isAllFilled = false
			}

			if (
				input.tagName === 'SELECT' &&
				input.required &&
				input.selectedIndex === 0
			) {
				isAllFilled = false
			}
		})

		const isTelValid = telPattern.test(inputTel.value)
		const isEmailValid = emailPattern.test(inputEmail.value)

		submitButton.disabled =
			!isAllFilled || !isTelValid || !isEmailValid
	}

	function validateInput(inputElement, pattern) {
		inputElement.addEventListener('input', function () {
			const isValid = pattern.test(inputElement.value)
			inputElement.style.border = isValid
				? '1px solid #d6dade'
				: '2px solid red'
			checkFormValidity()
		})
	}

	inputs.forEach(input => {
		input.addEventListener('input', checkFormValidity)
	})

	validateInput(inputTel, telPattern)
	validateInput(inputEmail, emailPattern)

	// Открытие/закрытие модального окна
	openButton.addEventListener('click', function () {
		modal.style.display = 'flex'
	})

	closeButton.addEventListener('click', function () {
		modal.style.display = 'none'
		clearForm()
	})

	window.addEventListener('click', function (event) {
		if (event.target === modal) {
			modal.style.display = 'none'
			clearForm()
		}
	})

	function clearForm() {
		form.reset()
		img.style.display = 'none'
		logoAction.style.display = 'flex'
		closeIcon.style.display = 'none'
		inputFile.value = null
		submitButton.disabled = true
		inputs.forEach(input => {
			input.style.border = '1px solid #d6dade'
		})
	}

	// Установка padding в инпутах с короткими ссылками
	document
		.querySelectorAll('.modal__short-link-container')
		.forEach(container => {
			const input = container.querySelector('.modal__short-link')
			const domainSpan = container.querySelector('.modal__input-domain')

			const updatePadding = () => {
				const domainWidth = domainSpan ? domainSpan.clientWidth : 0
				const paddingLeft = domainWidth + 16
				input.style.paddingLeft = `${paddingLeft}px`
			}

			input.addEventListener('focus', updatePadding)
		})

	// Обработка выбора картинки
	inputFile.addEventListener('change', handleFileSelect)

	dropArea.addEventListener('dragover', event => {
		event.preventDefault()
		dropArea.classList.add('hover')
	})

	dropArea.addEventListener('dragleave', () => {
		dropArea.classList.remove('hover')
	})

	dropArea.addEventListener('drop', event => {
		event.preventDefault()
		dropArea.classList.remove('hover')
		const files = event.dataTransfer.files
		if (files.length > 0) {
			handleFileSelect({ target: { files } })
		}
	})

	function handleFileSelect(event) {
		if (event.target.files && event.target.files[0]) {
			img.onload = () => {
				URL.revokeObjectURL(img.src)
			}
			img.src = URL.createObjectURL(event.target.files[0])
			img.style.display = 'block'
			logoAction.style.display = 'none'
			closeIcon.style.display = 'block'
			checkFormValidity()
		}
	}

	closeIcon.addEventListener('click', function () {
		img.style.display = 'none'
		logoAction.style.display = 'flex'
		this.style.display = 'none'
		inputFile.value = null
		checkFormValidity()
	})
})
