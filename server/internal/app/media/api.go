package media

import (
	"bytes"
	"context"
	"fmt"
	"io"
	"mime/multipart"
)

type MediaUploadRequest struct {
	RawBody multipart.Form
}

type MediaUploadResponse struct {
	Body struct {
		Url string
	}
}

func MediaUploadController(ctx context.Context, input *MediaUploadRequest) (*MediaUploadResponse, error) {
	fmt.Println("MediaUploadController")
	fileHeaders := input.RawBody.File["file"]
	fmt.Println("File headers: ", input.RawBody.File)
	if len(fileHeaders) == 0 {
		fmt.Println("No file provided")
		return nil, fmt.Errorf("no file provided")
	}

	file, err := fileHeaders[0].Open()
	if err != nil {
		fmt.Println("Failed to open file")
		return nil, fmt.Errorf("failed to open file: %v", err)
	}
	defer file.Close()

	header := fileHeaders[0]

	buf := bytes.NewBuffer(nil)
	if _, err := io.Copy(buf, file); err != nil {
		fmt.Println("Failed to copy file")
		return nil, fmt.Errorf("failed to copy file: %v", err)
	}

	url, err := MediaUpload(MediaUploadData{
		Filename:    header.Filename,
		ContentType: header.Header.Get("Content-Type"),
		Size:        header.Size,
		Body:        *buf,
	})

	if err != nil {
		fmt.Printf("Failed to upload file: %v\n", err)
		return nil, fmt.Errorf("failed to upload file: %v", err)
	}

	response := &MediaUploadResponse{}
	response.Body.Url = url

	fmt.Println("File uploaded to: ", url)

	return response, nil
}
