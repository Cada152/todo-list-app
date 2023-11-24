document.addEventListener('DOMContentLoaded', () => {
	const form = document.querySelector("#new-task-form");
	const input = document.querySelector("#new-task-input");
	const list_el = document.querySelector("#tasks");

	// Dito po nagloload ng tasks
	const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

	// Ito po yung part na inisave siya sa localstorage
	function saveTasks() {
		localStorage.setItem('tasks', JSON.stringify(tasks));
	}

	// Dito naman po yung rendering ng tasks
	function renderTasks() {
		list_el.innerHTML = '';
		tasks.forEach((task, index) => {
			const task_el = document.createElement('div');
			task_el.classList.add('task');

			const task_content_el = document.createElement('div');
			task_content_el.classList.add('content');

			task_el.appendChild(task_content_el);

			const task_input_el = document.createElement('input');
			task_input_el.classList.add('text');
			task_input_el.type = 'text';
			task_input_el.value = task;
			task_input_el.setAttribute('readonly', 'readonly');

			task_content_el.appendChild(task_input_el);

			const task_actions_el = document.createElement('div');
			task_actions_el.classList.add('actions');

			const task_edit_el = document.createElement('button');
			task_edit_el.classList.add('edit');
			task_edit_el.innerText = 'Edit';

			const task_delete_el = document.createElement('button');
			task_delete_el.classList.add('delete');
			task_delete_el.innerText = 'Delete';

			task_actions_el.appendChild(task_edit_el);
			task_actions_el.appendChild(task_delete_el);

			task_el.appendChild(task_actions_el);

			list_el.appendChild(task_el);

			// Kapag po pinindot edit button, pwede po iedit
			task_edit_el.addEventListener('click', () => {
				if (task_edit_el.innerText.toLowerCase() == "edit") {
					task_edit_el.innerText = "Save";
					task_input_el.removeAttribute("readonly");
					task_input_el.focus();
				} else {
					task_edit_el.innerText = "Edit";
					task_input_el.setAttribute("readonly", "readonly");
					tasks[index] = task_input_el.value; // Update the task in the array
					saveTasks(); // Save the updated tasks to local storage
				}
			});

			// Kapag naman pinidot po delete, pwede po siyang idelete
			task_delete_el.addEventListener('click', () => {
				list_el.removeChild(task_el);
				tasks.splice(index, 1); // Remove the task from the array
				saveTasks(); // Save the updated tasks to local storage
			});
		});
	}

	// Dito naman yung sa submission ng task
	form.addEventListener('submit', (e) => {
		e.preventDefault();

		const task = input.value.trim();
		if (task !== '') {
			tasks.push(task); // Iaadd yung nilagay na task
			saveTasks(); // Save yung updated na nilagay na task
			renderTasks(); // dito po inirerender yung task
			input.value = ''; // Icleclear yung input field
		}
	});

	// Start ng rendering
	renderTasks();
});