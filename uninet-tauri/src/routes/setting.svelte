<script>
  /*
    import { goto } from "$app/navigation";
  
    import { auth } from "$lib/stores/auth";
    import { onMount } from "svelte";
  
    let active = false;
  
    let axiosApi;
    onMount(async () => {
      axiosApi = await import("$lib/utils/axiosApi");
    });
  

    //deleteuser
    async function handleDelete() {
      const res = await axiosApi.deleteUser($auth.user._id);
  
      snackbar.showSnackbar({ open: true, type: res.type, msg: res.message });
      if (res.type === "success") {
        localStorage.removeItem("token");
        goto("/");
      }
      try {
      } catch (error) {
        console.log(error);
      }
    }


    //edituser
    onMount(async () => {
    axiosApi = await import("$lib/utils/axiosApi");
  });
  let name = $auth.user.name || "";
  let email = $auth.user.email || "";
  let bio = $auth.user.bio || "";
  let profilePic = $auth.user.profilePic || "";

  async function handleEdit() {
    const res = await axiosApi.editUser($auth.user._id, {
      name,
      email,
      bio,
      profilePic,
    });

    snackbar.showSnackbar({ open: true, type: res.type, msg: res.message });
    if (res.type === "success") {
      window.location.reload();
    }
    try {
    } catch (error) {
      console.log(error);
    }
  }
  */
  </script>
  
<!--edituser-->
<!--
<div class="text-center">
    <button
      on:click={() => (active = true)}
      rounded
      class="yellow-text ml-4"
      fab
      icon
    >
      <Icon path={mdiPencil} />
    </button>
  </div>
  
  <div class="pa-4 text-center" bind:active>
    <div>
      <div
        style="display: flex;align-items: center;justify-content: center;flex-direction: column;"
      >
        {#if $auth.user?.profilePic}
          <Avatar size={180}
            ><img src={$auth.user.profilePic} alt="profile" /></Avatar
          >
        {:else}
          <Avatar class="blue white-text text-h1" size={180}>
            {$auth.user?.name.split("")[0].toUpperCase()}
          </Avatar>
        {/if}
  
        <div class="mt-8">
          <input bind:value={name} text="Username" class="mt-2 mb-2" rounded outlined>
          <input bind:value={email} text="Email" class="mt-2 mb-2" rounded outlined>
          
          <input bind:value={bio} class="mt-2 mb-2" text="Bio" rounded outlined>
          <input rounded outlined bind:value={profilePic} class="mt-2 mb-2" text="Profile Image Url">
        </div>

        <div class="mt-8 mb-8">
          <button on:click={() => handleEdit()} class="blue" rounded size="large"
            >Update</button
          >
        </div>
      </div>
    </div>
  </div>
  -->


  <!--delteuser-->
  <!--
  <div class="text-center">
    <button
      on:click={() => (active = true)}
      rounded
      class="red-text ml-4"
      fab
      icon
    >
      <Icon path={mdiDelete} />
  </button>
  </div>
  
  <div persistent bind:active>
    <div>
      <div>Are you sure want to Delete Account ?</div>
      <div>
        After deleting account you are not able to get back yor data like
        followers and posts
      </div>
      <div>
        <button on:click={() => (active = false)} text>No</button>
        <button on:click={() => handleDelete()} text class="red-text"
          >Delete</button
        >
      </div>
    </div>
</div>
-->

