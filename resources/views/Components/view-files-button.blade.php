<!-- resources/views/components/view-files-button.blade.php -->

@props(['fileData'])

<!-- Button to trigger the modal -->
<button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#fileModal">
    View Files
</button>

<!-- Modal -->
<div class="modal fade" id="fileModal" tabindex="-1" aria-labelledby="fileModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="fileModalLabel">Uploaded Files</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <ul id="fileList">
                    <!-- Files will be dynamically inserted here -->
                </ul>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
        </div>
    </div>
</div>

<script>
    document.addEventListener('DOMContentLoaded', function () {
        const fileData = @json($fileData);
        const fileList = document.getElementById('fileList');

        fileData.forEach(file => {
            const listItem = document.createElement('li');
            const link = document.createElement('a');
            link.href = `{{ Storage::url('') }}${file}`;
            link.textContent = file;
            link.target = '_blank';
            listItem.appendChild(link);
            fileList.appendChild(listItem);
        });
    });
</script>