<script context="module">
	export async function load({ fetch }) {
	  const res = await fetch('https://run.mocky.io/v3/d1a39d21-9f98-4719-94de-84cc746e265d')
	  const textchannelprofile = await res.json()
	
  
	if (res.ok) {
	  return {
		props: {
		  textchannelprofile
		}
	  }
	}
  
	return {
	  status: res.status,
	  error: new Error('fetch failed')
	}
  }
  </script>
  









<script>


	export let textchannelprofile



	import Modal from '$lib/components/Modal.svelte'
	import SveltyPicker from '$lib/components/calender/SveltyPicker.svelte'

	const filesPath = '/'; 
    let fileToUpload = null;
    let fileName = ''
    let disabled;
    $: disabled = !fileToUpload || !fileName ? 'disabled' : '';

	const handleFileChange = event => {
        if (event.target.files && event.target.files.length > 0) {
            fileToUpload = event.target.files[0];
        }
    };
    /* Handles the submit event */
    const handleSubmit = () => {
        /* Checks if all the data is set */
        if (fileToUpload && fileName) {
            /* Creates the form data */
            let formData = new FormData();
            /* Size must be the first part */
            formData.append('size', fileToUpload.size);
            /* Other parts */
            formData.append('file', fileToUpload);
            formData.append('name', fileName);
            formData.append('mimeType', fileToUpload.mimeType);
            formData.append('path', filesPath);
            /* Calls the process on the server */
            fetch('upload', {
                method: 'POST',
                body: formData,
                /* Don't set the Content-Type header.
                 See: https://muffinman.io/uploading-files-using-fetch-multipart-form-data/ */
            })
            /* Handles the response */
            .then(res => {
                if (!res.ok) {  // the response has a bad status (500..)
                    throw new Error('upload error status ' + res.status + ', status text: ' + res.statusText);
                } else {
                    alert(`Done! See the uploaded file in the /static${filesPath} directory.`);
                }
            })
            .catch(err => alert('Ooops: ' + err));
        }
    };


	
  </script>
<main>




	{#each textchannelprofile as textchannelpeopel}          
    <section class="Textchannelprofile">
      <a class="channelprofile" href="/userid"> 
        <div class="avatarpicture" role="img"> 
          <img src={textchannelpeopel.avatar} class="avatarpicturecircle" width="48px" hieght="48px" alt="d"> 
        </div>
        <div class="friendsusername">{textchannelpeopel.username}</div>
        <div class="desc">{textchannelpeopel.name}</div>
      </a>
    </section>
  {/each}
  


<SveltyPicker/>


  <Modal>
	<div slot="trigger" let:open>
	  <button on:click={open}
	  class="m-2 w-full inline-flex justify-center rounded-md border border-gray-300 dark:border-gray-500 shadow-sm px-5 py-3 bg-purple-500 dark:bg-purple-400 text-base font-medium text-white hover:bg-purple-700  dark:hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 dark:focus:ring-purple-400 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm capitalize">
	create post</button>
	</div>
	<div slot="header">
	  <h1>Post</h1>
	</div>
	<div slot="content">
	  <!-- Modal within a Modal -->
	  <Modal>
		<div slot="trigger" let:open>
		  <button on:click={open}>Next</button>
		</div>
		<div slot="header">
		  <h1>Second Modal</h1>
		</div>
		<div slot="content">
			<p>
			  Post
			</p>
		</div>
	  </Modal>
	  <div class="top-2 flex-col-center">
		<div class="">
			<label for="input-file">Choose a file:</label>
			<input type="file"
				   id="input-file"
				   name="input-file"
				   on:change={handleFileChange}
			>
		</div>
		<div class="top-1">
			<label for="file-name">Give it a name + ext:</label>
			<input type="text"
				   id="file-name"
				   name="file-name"
				   bind:value={fileName}
			>
		</div>
		<div class="top-1">
			<button class="btn"
					{disabled}
					type="submit"
					on:click={handleSubmit}
			>
				Start
			</button>
		</div>
  
		<p>
		  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Similique, magni earum ut ex
		  totam corporis unde incidunt deserunt, dolorem voluptatum libero quia. Maiores, provident
		  error vel veritatis itaque nemo commodi.
		</p>
	</div>
</div>
  
	<div slot="footer" let:store={{close}}>
	  <button on:click={close}>Close First Modal</button>
	</div>
  </Modal>

</main>