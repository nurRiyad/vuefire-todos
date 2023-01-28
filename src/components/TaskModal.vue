<template>
  <div>
    <!-- The button to open modal -->
    <label for="my-modal" class="btn btn-primary btn-wide"
      >Create New Task</label
    >

    <!-- Put this part before </body> tag -->
    <input type="checkbox" id="my-modal" class="modal-toggle" />
    <div class="modal">
      <div class="modal-box">
        <h3 class="font-bold text-lg">Create New Task</h3>
        <div class="py-4 flex flex-col space-y-3">
          <input
            type="text"
            placeholder="Title"
            class="input input-bordered input-primary w-full"
          />
          <input
            type="text"
            placeholder="Desscription"
            class="input input-bordered input-primary w-full"
          />
        </div>
        <div class="modal-action">
          <label for="my-modal" class="btn btn-primary">Create</label>
        </div>
      </div>
    </div>
  </div>
</template>
